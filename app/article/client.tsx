'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {ArticleModel, PaginationModel} from "shared/models";
import {articlesQuery} from "shared/queries/main";
import {VmArticle} from "shared/viewmodels";
import {UiDataBoundary, UiGrid, UiPage} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await articlesQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("articles", data.items.map(item => new ArticleModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage className={"p-article"}>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ ROUTES.ARTICLES()]}
                title={'Блог'}
                subtitle={'Здесь собраны самые впечатляющие статьи путешественников.'}

            />
            <UiPage.Wrap>
                <UiDataBoundary isLoading={store.isLoading} withShallow>
                    <UiGrid columns={3} gap={[8, 8]}>
                        {store.articles.map(articles => <VmArticle key={articles.id} template={'light'} item={articles}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiPage.Wrap>
        </UiPage>
    )
});
