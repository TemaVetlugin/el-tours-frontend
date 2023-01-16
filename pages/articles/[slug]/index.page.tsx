import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import {
    UiArticleTile,
    UiBreadcrumbs,
    UiCard,
    UiGrid,
    UiHtml,
    UiSeo,
    UiSocialShare,
    UiTypography,
    UiWrap
} from "shared/uikit";
import { MEDIA_POINTS, MENU, ROUTES } from "shared/contants";
import { getApplicationData, Redis } from "shared/server";
import { articlesGetRequest } from "shared/requests/api";
import { ApplicationDataType } from "shared/types";
import { ArticleModel, IArticleModel } from "shared/models";
import { useObservable } from "shared/hooks";
import { formatDate } from "shared/utilities";
import { CCatalogProductsSlider, CLinkButton } from "shared/components";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType,
    article: IArticleModel,
    articles: IArticleModel[],
}

const ArticleDetailPage: NextPage<PropsType> = observer(({ application, article, articles }: PropsType) => {
    BootstrapModule.application(application);

    const store = useObservable({
        article: new ArticleModel(article),
        articles: articles.map(article => new ArticleModel(article)),
    });

    useEffect(() => {
        store.update({
            article: new ArticleModel(article),
            articles: articles.map(article => new ArticleModel(article)),
        });
    }, [article, store, articles])

    return (
        <Layout>
            <UiSeo
                title={store.article.name}
                image={store.article.previewImageThumbnail}
            />
            <UiWrap>
                <UiBreadcrumbs items={[MENU.ARTICLES(), MENU.ARTICLE(store.article.name)]}/>
                <LayoutTitle value={article.name}/>
                <UiGrid
                    className="p-article"
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 30 },
                        [MEDIA_POINTS.IS_768]: { columns: 1, gap: 48 },
                        [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 72 },
                        [MEDIA_POINTS.IS_1366]: { columns: '1fr 310px', gap: 40 }
                    }}
                >
                    <UiCard>
                        {store.article.detailImageThumbnail && (
                            <img className="p-article__image" src={store.article.detailImageThumbnail} alt=""/>
                        )}
                        <h2 className="p-article__title">{store.article.name}</h2>
                        {store.article.publishedAt && (
                            <time className="p-article__date">{formatDate(store.article.publishedAt)}</time>
                        )}
                        <UiTypography>
                            <UiHtml value={store.article.content}/>
                        </UiTypography>
                        <div className="p-article__footer">
                            <CLinkButton href={ROUTES.ARTICLES()} label='Ко всем статьям'/>
                            <UiSocialShare/>
                        </div>
                    </UiCard>
                    <div className="p-article-aside">
                        <h3 className="p-article-aside__title">Другие статьи</h3>
                        <UiGrid
                            media={{
                                [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                                [MEDIA_POINTS.IS_768]: { columns: 2, gap: 28 },
                                [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 29 },
                                [MEDIA_POINTS.IS_1366]: { columns: 1, gap: 24 }
                            }}
                        >
                            {store.articles.map(article => (
                                <UiArticleTile
                                    isSmall
                                    key={article.id}
                                    name={article.name}
                                    href={ROUTES.ARTICLE(article.slug)}
                                    image={article.previewImageThumbnail}
                                />
                            ))}
                        </UiGrid>
                    </div>
                </UiGrid>
                <LayoutSection title={'Товары в статье'}>
                    <CCatalogProductsSlider catalogProducts={store.article.catalogProducts}/>
                </LayoutSection>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const application = await getApplicationData();
    const slug = context.query.slug as string;

    const { isSuccess, data, description } = await Redis.cache(
        `articlesGetRequest:${slug}`,
        async () => await articlesGetRequest({ slug }),
        3600
    );

    if (!isSuccess || !data?.item) {
        return {
            redirect: {
                permanent: false,
                destination: ROUTES.ERROR_404()
            }
        }
    }

    return {
        props: {
            application,
            article: data.item,
            articles: data.items
        }
    }
}

export default ArticleDetailPage;
