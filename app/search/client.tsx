'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { ROUTES } from "shared/contants";
import { useAsyncEffect, useObservable, useRouter, useSearchParams } from "shared/hooks";
import { searchCountsQuery } from "shared/queries/main";
import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { PSearchCatalogProducts } from "./component/PSearchCatalogProducts";

import { PSearchTabButton } from "./component/PSearchTabButton";

type PropsType = {
    query: string,
    page: string
}

export const Client = observer(({ query, page }: PropsType) => {
    const router = useRouter();
    const searchParams = useSearchParams({
        tab: 'catalogProducts',
        query: ''
    });

    const store = useObservable({
        isLoading: true,
    });

    const counts = useObservable({
        catalogProducts: 0,
        compilations: 0,
        news: 0,
        articles: 0,
        total: 0
    });

    useAsyncEffect(async () => {
        const { isSuccess, data } = await searchCountsQuery({ query: searchParams.query });
        if (isSuccess && data) {
            counts.update(data);
            guessTab();

            store.set("isLoading", false);
        }
    }, [searchParams.query]);

    const guessTab = () => {
        const tabs: Partial<keyof typeof counts>[] = ['catalogProducts', 'compilations', 'news', 'articles'];
        for (let i = 1; i < tabs.length; i++) {
            if (counts[tabs[i - 1]] === 0 && counts[tabs[i]] !== 0) {
                router.replace(null, {
                    ...searchParams,
                    tab: tabs[i]
                });
                break;
            }
        }
    }

    return (
        <UiPage className={'p-search'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.SEARCH(),
                    ]}
                />

                <div className="p-search__header">
                    <div className="p-search-tabs">
                        <div className="p-search-tabs__label">Результаты поиска</div>
                        {!store.isLoading && (
                            <div className="p-search-tabs__items">
                                <PSearchTabButton label={'Товаров'} count={counts.catalogProducts} name={'catalogProducts'}/>
                                <PSearchTabButton label={'Подборок'} count={counts.compilations} name={'compilations'}/>
                                <PSearchTabButton label={'Новостей'} count={counts.news} name={'news'}/>
                                <PSearchTabButton label={'Статей'} count={counts.articles} name={'articles'}/>
                            </div>
                        )}
                    </div>
                </div>
                <UiDataBoundary
                    isLoading={store.isLoading}
                    render={() => (
                        <>
                            {searchParams.tab === 'catalogProducts' && <PSearchCatalogProducts query={searchParams.query}/>}
                            {searchParams.tab === 'catalogProducts' && <PSearchCatalogProducts query={searchParams.query}/>}
                        </>
                    )}
                />
            </UiWrap>
        </UiPage>
    )
});
