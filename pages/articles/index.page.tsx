import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutTitle } from "shared/layout";
import { UiArticleTile, UiBoundary, UiBreadcrumbs, UiCard, UiGrid, UiPagination, UiSeo, UiWrap } from "shared/uikit";
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

    return (
        <Layout>
            <UiSeo title={'Полезные статьи'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.ARTICLES()]}/>
                <LayoutTitle value='Полезные статьи'/>
                <UiBoundary isLoading={store.isLoading}>
                    <UiGrid media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 40 },
                        [MEDIA_POINTS.IS_768]: { columns: 1, gap: 40 },
                        [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 72 },
                        [MEDIA_POINTS.IS_1366]: { columns: '1fr 637px', gap: 30 }
                    }}>
                        <div>
                            <UiGrid columns={1} gap={20}>
                                {store.largeArticles.map(article => (
                                    <UiCard key={article.id}>
                                        <UiArticleTile
                                            isLarge
                                            name={article.name}
                                            href={ROUTES.ARTICLE(article.slug)}
                                            image={article.previewImageThumbnail}
                                        />
                                    </UiCard>
                                ))}
                            </UiGrid>
                        </div>
                        <div>
                            <UiGrid
                                className='p-articles__items'
                                media={{
                                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 32 },
                                    [MEDIA_POINTS.IS_768]: { columns: 2, gap: [20, 30] },
                                    [MEDIA_POINTS.IS_1024]: { columns: 3, gap: [29, 40] },
                                    [MEDIA_POINTS.IS_1366]: { columns: 2, gap: [22, 34] }
                                }}
                            >
                                {store.articles.map(article => (
                                    <UiArticleTile
                                        key={article.id}
                                        name={article.name}
                                        href={ROUTES.ARTICLE(article.slug)}
                                        image={article.previewImageThumbnail}
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
