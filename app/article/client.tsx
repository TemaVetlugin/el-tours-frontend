'use client';

import React from "react";
import {observer} from "mobx-react-lite";

import {useAsyncEffect, useSearchParams, useStore} from "shared/hooks";
import {ArticleModel, PaginationModel} from "shared/models";
import {articlesQuery} from "shared/queries/main";
import {VmArticle} from "shared/viewmodels";
import {UiDataBoundary, UiPage} from "shared/ui";
import {LayoutHeader} from "shared/layout";
import {ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import {UiCardWrap} from "shared/ui/UiCardsWrap";

import './page.scss';

export const Client = observer(() => {
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1})


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
    }, [searchParams.page]);

    return (
        <UiPage className={"p-articles"}>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.HOME()}
                title={'Блог'}
                subtitle={'Здесь собраны самые впечатляющие статьи путешественников.'}

            />
            <UiPage.Wrap>
                <UiDataBoundary isLoading={store.isLoading} withShallow>
                    <UiCardWrap className={"p-articles-card__wrap"}>
                        {store.articles.map((article) =>
                            <VmArticle key={article.id}
                                    article={article}
                            />)}
                    </UiCardWrap>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiPage.Wrap>
        </UiPage>
    )
});
