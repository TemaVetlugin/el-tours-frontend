import React, { useRef } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { useDebouncedCallback, useOnClickOutside, useObservable } from "shared/hooks";
import { UiForm, UiIcon } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";
import { ApplicationModule } from "shared/modules";

import { CatalogProductModel } from "shared/models";
import { catalogProductsSearchHintsRequest } from "shared/requests/api";
import { toCurrency } from "shared/utilities";

import './index.scss';


type PropsType = {
    autoFocus?: boolean
}
export const LayoutHeaderSearch = observer(({ autoFocus = false }: PropsType) => {
    const refControl = useRef<HTMLDivElement>(null)
    const router = useRouter();

    const store = useObservable({
        query: '',
        isOpened: true,
        catalogProducts: [] as CatalogProductModel[]
    });

    useOnClickOutside(refControl, () => {
        store.set("isOpened", false);
    })

    const handleSearch = (query: string) => {
        store.set("query", query);
        fetchHints();
    };

    const fetchHints = useDebouncedCallback(async () => {
        if (!store.query || store.query.length < 3) {
            return;
        }

        const { isSuccess, data } = await catalogProductsSearchHintsRequest({ query: store.query });

        if (isSuccess && data) {
            store.set("catalogProducts", data.items.map(item => new CatalogProductModel(item)));
        }
    }, 300);

    const handleSubmit = () => {
        if (!store.query) {
            return;
        }
        store.set("isOpened", false);
        router.push({
            pathname: ROUTES.SEARCH(),
            query: {
                query: store.query
            }
        })
    }

    return (
        <UiForm className='layout-header-search' onSubmit={handleSubmit}>
            <div className="layout-header-search-control" ref={refControl}>
                <div className="layout-header-search-control__icon" onClick={handleSubmit}>
                    <UiIcon size={20} name={'search'} color={COLORS.GRAY_MEDIUM}/>
                </div>
                <input
                    autoFocus={autoFocus}
                    type="text"
                    className='layout-header-search-control__input'
                    value={store.query}
                    onChange={(e) => handleSearch(e.target.value || '')}
                    placeholder=' '
                    onFocus={() => store.set("isOpened", true)}
                />
                <div className="layout-header-search-control__placeholder">
                    Название, производитель, штрих-код или действующее вещество
                </div>
                {(store.isOpened && !!store.catalogProducts.length) && (
                    <div className="layout-header-search__hints">
                        {store.catalogProducts.map(catalogProduct => (
                            <div key={catalogProduct.id} className="layout-header-search-hint" onClick={(e) => {
                                store.set("isOpened", false)
                                router.push(ROUTES.PRODUCT(catalogProduct.slug));
                            }}>
                                <div className="layout-header-search-hint__name">{catalogProduct.name}</div>
                                {catalogProduct.priceFrom && (
                                    <div className="layout-header-search-hint__price">
                                        {toCurrency(catalogProduct.priceFrom, 'от ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="layout-header-search__footer">
                <div className="layout-header-search__example">Например:</div>
                <div className="layout-header-search__prompts">
                    {ApplicationModule.headerSearchPrompts.map((headerSearchPrompt) => (
                        <div
                            key={headerSearchPrompt.id}
                            onClick={() => {
                                router.push({
                                    pathname: ROUTES.SEARCH(),
                                    query: {
                                        query: headerSearchPrompt.name
                                    }
                                })
                            }}
                            className="layout-header-search__prompt"
                        >
                            {headerSearchPrompt.name}
                        </div>
                    ))}
                </div>
            </div>
        </UiForm>
    )
})

