'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useStore, useRouter, useSearchParams} from "shared/hooks";
import { NewsModel, PaginationModel, TagModel, BlogArticleModel } from "shared/models";
import { newsQuery, blogArticlesQuery, tagsQuery } from "shared/queries/main";
import { CTileBlogArticle } from "shared/components/tiles";
import { UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap } from "shared/ui";

import './page.scss';
import {} from "shared/models/BlogArticle.model";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        tags: [] as TagModel[],
        news: [] as NewsModel[],
        blogArticles: [] as BlogArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({ page: 1, tagId: null as null | number })


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const { isSuccess, data } = await blogArticlesQuery({
            page: searchParams.page,
            cityId: city.id
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
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.NEWS()]}/>
                <UiPage.Header
                    title={'Новости'}
                    subtitle={'Скидки не суммируются, покупателю предоставляется максимальная из действующих скидок. В акциях не участвуют товары со специальной ценой.'}
                    aside={() => store.tags.length > 0 && (
                        <UiSelect
                            style={{
                                minWidth: 310
                            }}
                            placeholder={'Все рубрики'}
                            items={[
                                { id: null, name: 'Все рубрики' },
                                ...store.tags
                            ]}
                            value={searchParams.tagId}
                            onChange={(data) => {
                                router.replace(null, {
                                    ...searchParams,
                                    tagId: data.value
                                });
                            }}
                        />
                    )}
                />
                <UiDataBoundary isLoading={store.isLoading} withShallowLoading isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={4} gap={[20, 50]}>
                        {store.blogArticles.map(blogArticles => <CTileBlogArticle key={blogArticles.id} template={'light'} item={blogArticles}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiWrap>
        </UiPage>
    )
});
