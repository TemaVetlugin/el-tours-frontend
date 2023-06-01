import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSubtitle, LayoutTitle } from "shared/layout";
import {
    UiArticleTile,
    UiBoundary,
    UiBreadcrumbs,
    UiCard, UiFormControl,
    UiGrid,
    UiPagination,
    UiSelect,
    UiSeo,
    UiWrap
} from "shared/uikit";
import { MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
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

const ArticlesPage: NextPage<PropsType> = observer(({application}) => {
    BootstrapModule.application(application);
    const store = useObservable({
        isLoading: true,
        isLoadingNewPage: false,
        largeArticles: [] as ArticleModel[],
        articles: [] as ArticleModel[],
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
                store.set("articles", data.items.filter(item => !item.isLarge).map(item => new ArticleModel(item)));
            } else {
                store.set("largeArticles", [
                    ...store.largeArticles,
                    ...data.items.filter(item => item.isLarge).map(item => new ArticleModel(item))
                ]);
                store.set("articles", [
                    ...store.articles,
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

    const articles = [
        {
            id: 0,
            name: 'Что принимать будущей маме?',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
            isLarge: true
        },
        {
            id: 1,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },
        {
            id: 2,
            name: 'Уход за пожилыми и ограниченно подвижными людьми',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },
        {
            id: 3,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },
        {
            id: 4,
            name: 'Уход за пожилыми и ограниченно подвижными людьми',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },
        {
            id: 5,
            name: 'Выгодное предложение',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },

        {
            id: 6,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'detail',
        },
    ];

    return (
        <Layout>
            <UiSeo title={'Интересно'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.ARTICLES()]}/>
                <LayoutTitle value='Интересно'/>
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                    [MEDIA_POINTS.IS_768]: { columns: 1, gap: 30 },
                    [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 50 },
                    [MEDIA_POINTS.IS_1440]: { columns: 1, gap: 40 }
                }}>
                    <UiGrid media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                        [MEDIA_POINTS.IS_768]: { columns: '1fr 222px', gap: 16 },
                        [MEDIA_POINTS.IS_1024]: { columns: '1fr 310px', gap: 20 },
                        [MEDIA_POINTS.IS_1440]: { columns: '1fr 310px', gap: 20 }
                    }}>
                        <LayoutSubtitle>
                            Скидки не суммируются, покупателю предоставляется максимальная из действующих скидок.
                            В акциях не участвуют товары со специальной ценой.
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
                        <div>
                            <UiGrid
                                media={{
                                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                                    [MEDIA_POINTS.IS_768]: { columns: 3, gap: 16 },
                                    [MEDIA_POINTS.IS_1024]: { columns: 4, gap: [16, 24] },
                                    [MEDIA_POINTS.IS_1440]: { columns: 4, gap: [20, 50] }
                                }}
                            >
                                {/*{store.promoActions.map(news => (*/}
                                {articles.map(article => (
                                    <UiArticleTile
                                        key={article.id}
                                        name={article.name}
                                        href={ROUTES.ARTICLE(article.slug)}
                                        image={article.previewImageThumbnail}
                                        isLarge={article.isLarge}
                                    />
                                ))}
                            </UiGrid>
                            <UiPagination
                                isMore
                                isLoading={store.isLoadingNewPage}
                                pagination={store.pagination}
                            />
                        </div>
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

export default ArticlesPage;
