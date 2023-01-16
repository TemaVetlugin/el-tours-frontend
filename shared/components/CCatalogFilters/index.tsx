import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { UiBoundary, UiButton, UiCard, UiIcon } from "shared/uikit";
import { CatalogFilterModel } from "shared/models";

import { CCatalogFiltersItem } from "./components/CCatalogFiltersItem";

import './index.scss';
import { COLORS, ROUTES } from "shared/contants";
import { useObservable } from "shared/hooks";
import classnames from "classnames";

type PropsType = {
    isLoading: boolean
    catalogFilters: CatalogFilterModel[],
}

export const CCatalogFilters = observer(({ catalogFilters = [], isLoading }: PropsType) => {
    const router = useRouter();
    const store = useObservable({
        isOpened: false
    });

    useEffect(() => {
        if (!router.query) {
            return;
        }
        catalogFilters.forEach(catalogFilter => {
            if (!router.query[catalogFilter.name]) {
                catalogFilter.update({
                    value: null
                })
                return;
            }
            catalogFilter.update({
                isOpened: true
            });
            catalogFilter.setValue(router.query[catalogFilter.name]);
        });
    }, [catalogFilters, router])

    const handleSubmit = () => {
        const query = {
            ...router.query,
        };
        delete query['page'];

        catalogFilters.forEach(catalogFilter => {
            if (catalogFilter.value) {
                query[catalogFilter.name] = catalogFilter.value;
            } else {
                delete query[catalogFilter.name];
            }
        });

        router.push({ query }, undefined, { shallow: true })
        store.set("isOpened", false);
    }

    return (
        <div className={classnames('c-catalog-filters', {
            'c-catalog-filters--opened': store.isOpened
        })}>
            <div className="c-catalog-filters__button">
                <UiButton
                    isRounded
                    hasBorder={false}
                    href={ROUTES.CATALOG()}
                    onClick={(e) => {
                        e.preventDefault();
                        store.set("isOpened", !store.isOpened);
                    }}
                    colors={{
                        button: store.isOpened
                            ? COLORS.PRIMARY2
                            : [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                        label: store.isOpened ? COLORS.PRIMARY : COLORS.WHITE
                    }}
                >
                    {store.isOpened ? (
                        <UiIcon size={20} name={'close'} color={COLORS.PRIMARY}/>
                    ) : (
                        <UiIcon size={20} name={'filter'} color={COLORS.WHITE}/>
                    )}
                    <span>Фильтр</span>
                </UiButton>
            </div>
            <UiCard className="c-catalog-filters__inner">
                <div className="c-catalog-filters__items">
                    <UiBoundary isLoading={isLoading}>
                        {catalogFilters.map(catalogFilter => (
                            <CCatalogFiltersItem key={catalogFilter.name} catalogFilter={catalogFilter}/>
                        ))}
                    </UiBoundary>
                </div>
                <div className="c-catalog-filters__footer">
                    <UiButton
                        onClick={handleSubmit}
                        label='ПРИМЕНИТЬ'
                        hasBorder={false}
                        colors={{
                            button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                            label: [COLORS.WHITE, COLORS.WHITE]
                        }}
                    />
                    <UiButton
                        label='СБРОСИТЬ'
                        onClick={() => {
                            const { query } = router.query; // for search route
                            router.push({ query: { query } }, undefined, { shallow: true });
                        }}
                    />
                </div>
            </UiCard>
        </div>
    )
});
