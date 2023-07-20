'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useObservable, useRouter, useSearchParams } from "shared/hooks";
import { NewsModel, PaginationModel, TagModel } from "shared/models";
import { newsQuery, tagsQuery } from "shared/queries/main";
import { CTileNews } from "shared/components/tiles";
import { UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap } from "shared/ui";

import './page.scss';

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useObservable({
        tags: [] as TagModel[],
        news: [] as NewsModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({ page: 1, tagId: null as null | number })

    useEffect(() => {
        document.title = 'Новости';
    }, []);

    useAsyncEffect(async () => {
        const { isSuccess, data } = await tagsQuery({ has: ['news'] });
        if (isSuccess && data) {
            store.set("tags", data.items.map(item => new TagModel(item)));
        }
    }, []);

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const { isSuccess, data } = await newsQuery({
            page: searchParams.page,
            tagId: searchParams.tagId,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("news", data.items.map(item => new NewsModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city]);

    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.NEWS()]}/>
                <UiPage.Header title={'Новости'}/>
                {store.tags.length > 0 && (
                    <UiSelect
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
                <UiDataBoundary isLoading={store.isLoading} withShallowLoading isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={4} gap={[20, 50]}>
                        {store.news.map(news => <CTileNews key={news.id} template={'light'} value={news}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiWrap>
        </UiPage>
    )
});
