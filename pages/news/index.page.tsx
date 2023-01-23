import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSubtitle, LayoutTitle } from "shared/layout";
import {
    UiNewsTile,
    UiBoundary,
    UiBreadcrumbs,
    UiFormControl,
    UiGrid,
    UiPagination,
    UiSelect,
    UiSeo,
    UiWrap
} from "shared/uikit";
import { MEDIA_POINTS, MENU, ROUTES } from "shared/contants";
import { useObservable } from "shared/hooks";
import { ArticleModel, PaginationModel } from "shared/models";
import { articlesRequest } from "shared/requests/api";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const NewsPage: NextPage<PropsType> = observer(({application}) => {
    BootstrapModule.application(application);
    const store = useObservable({
        isLoading: true,
        isLoadingNewPage: false,
        largeArticles: [] as ArticleModel[],
        news: [] as ArticleModel[],
        pagination: new PaginationModel()
    });

    const page = useMemo(() => store.pagination.page, [store.pagination.page]); //fix exhaustive

    const load = useCallback(async () => {
        store.set("isLoadingNewPage", true);

        const { isSuccess, data } = await articlesRequest({
            page
        });

        if (isSuccess && data) {
            if(page && +page === 1){
                store.set("largeArticles", data.items.filter(item => item.isLarge).map(item => new ArticleModel(item)));
                store.set("news", data.items.filter(item => !item.isLarge).map(item => new ArticleModel(item)));
            } else {
                store.set("largeArticles", [
                    ...store.largeArticles,
                    ...data.items.filter(item => item.isLarge).map(item => new ArticleModel(item))
                ]);
                store.set("news", [
                    ...store.news,
                    ...data.items.filter(item => !item.isLarge).map(item => new ArticleModel(item))
                ]);
            }

            store.set("pagination", new PaginationModel(data.pagination));
        }

        store.set("isLoading", false);
        store.set("isLoadingNewPage", false);
    }, [store, page]);

    useEffect(() => {
        load();
    }, [load]);

    const news = [
        {
            id: 0,
            href: '#',
            name: 'Бережем нервы. Как избавиться от стресса',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'news-detail'
        },
        {
            id: 1,
            href: '#',
            name: 'Бережем нервы. Как избавиться от стресса',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'news-detail'
        },
        {
            id: 2,
            href: '#',
            name: 'План поддержки здоровья летом',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'news-detail'
        },
        {
            id: 3,
            href: '#',
            name: 'План поддержки здоровья летом',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'news-detail'
        },
        {
            id: 4,
            href: '#',
            name: 'Бережем нервы. Как избавиться от стресса',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'news-detail'
        },
    ];

    return (
        <Layout>
            <UiSeo title={'Новости'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.NEWS()]}/>
                <LayoutTitle value='Новости'/>
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                    [MEDIA_POINTS.IS_768]: { columns: 1, gap: 30 },
                    [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 50 },
                    [MEDIA_POINTS.IS_1366]: { columns: 1, gap: 40 }
                }}>
                    <UiGrid media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                        [MEDIA_POINTS.IS_768]: { columns: '1fr 222px', gap: 16 },
                        [MEDIA_POINTS.IS_1024]: { columns: '1fr 310px', gap: 20 },
                        [MEDIA_POINTS.IS_1366]: { columns: '1fr 310px', gap: 20 }
                    }}>
                        <LayoutSubtitle>
                            Скидки не суммируются, покупателю предоставляется максимальная из&nbsp;действующих скидок.
                            В&nbsp;акциях не участвуют товары со специальной ценой.
                        </LayoutSubtitle>
                        <UiFormControl>
                            <UiSelect
                                name='select'
                                value="option1"
                                placeholder="Выберите рубрику"
                                items={[
                                    { id: 0, name: 'Рубрика 1' },
                                    { id: 1, name: 'Рубрика 2' },
                                    { id: 2, name: 'Рубрика 3' },
                                ]}
                            />
                        </UiFormControl>
                    </UiGrid>
                    <UiBoundary isLoading={store.isLoading}>
                        <UiGrid>
                            <div>
                                <UiGrid
                                    media={{
                                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                                        [MEDIA_POINTS.IS_768]: { columns: 3, gap: [16, 24] },
                                        [MEDIA_POINTS.IS_1024]: { columns: 4, gap: [16, 24] },
                                        [MEDIA_POINTS.IS_1366]: { columns: 4, gap: [20, 50] }
                                    }}
                                >
                                    {/*{store.news.map(news => (*/}
                                    {news.map(newsItem => (
                                        <UiNewsTile
                                            key={newsItem.id}
                                            name={newsItem.name}
                                            href={ROUTES.NEWS_DETAIL(newsItem.slug)}
                                            image={newsItem.previewImageThumbnail}
                                        />
                                    ))}
                                </UiGrid>
                                <UiPagination
                                    isMore
                                    isLoading={store.isLoadingNewPage}
                                    pagination={store.pagination}
                                />
                            </div>
                        </UiGrid>
                    </UiBoundary>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default NewsPage;
