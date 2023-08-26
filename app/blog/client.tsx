'use client';

import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";

import {ROUTES} from "shared/contants";
import {useAsyncEffect, useCity, useStore, useRouter, useSearchParams} from "shared/hooks";
import {NewsModel, PaginationModel, TagModel, BlogArticleModel} from "shared/models";
import {newsQuery, blogArticlesQuery, tagsQuery} from "shared/queries/main";
import {CTileBlogArticle} from "shared/components/tiles";
import {UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap} from "shared/ui";

import './page.scss';
import {} from "shared/models/BlogArticle.model";
import {auto} from "@popperjs/core";
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "./components/PBlogHeaderSearch";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        blogArticles: [] as BlogArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await blogArticlesQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("blogArticles", data.items.map(item => new BlogArticleModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                title={'Блог'}
                subtitle={'Здесь собраны самые впечатляющие статьи путешественников.'}

            />
            <UiPage.Wrap>
                <UiDataBoundary isLoading={store.isLoading} withShallowLoading isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={2} gap={[8, 8]}>
                        {store.blogArticles.map(blogArticles => <CTileBlogArticle key={blogArticles.id} template={'light'} item={blogArticles}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiPage.Wrap>
        </UiPage>
    )
});
