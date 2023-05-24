import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import {
    UiArticleTile,
    UiBreadcrumbs,
    UiCard,
    UiGrid,
    UiHtml, UiIcon, UiLink,
    UiSeo,
    UiSocialShare,
    UiTypography,
    UiWrap
} from "shared/uikit";
import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
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
    // BootstrapModule.application(application);

    // const store = useObservable({
    //     article: new ArticleModel(article),
    //     articles: articles.map(article => new ArticleModel(article)),
    // });

    // useEffect(() => {
    //     store.update({
    //         article: new ArticleModel(article),
    //         articles: articles.map(article => new ArticleModel(article)),
    //     });
    // }, [article, store, articles])

    const store = {
        article: {
            name: 'Аллергический ринит: что делать при первых симптомах?',
            previewImageThumbnail: 'https://via.placeholder.com/812x453',
            detailImageThumbnail: 'https://via.placeholder.com/812x453'
        },
        articles: [
            {
                id: 0,
                name: 'Чем лечат коронавирус: 8 перспективных препаратов',
                previewImageThumbnail: 'https://via.placeholder.com/315x196',
                slug: 'detail',
                isLarge: true
            },
            {
                id: 1,
                name: 'Врачи дали советы по лечению COVID-19 в домашних условиях',
                previewImageThumbnail: 'https://via.placeholder.com/315x196',
                slug: 'detail',
            },
            {
                id: 2,
                name: 'Как лечить COVID-19 дома',
                previewImageThumbnail: 'https://via.placeholder.com/315x196',
                slug: 'detail',
            },
            {
                id: 3,
                name: 'Врачи дали советы по лечению COVID-19 в домашних условиях',
                previewImageThumbnail: 'https://via.placeholder.com/315x196',
                slug: 'detail',
            },
        ],
    }

    return (
        <Layout>
            <UiSeo
                title={store.article.name}
                image={store.article.previewImageThumbnail}
            />
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.ARTICLES(), BREADCRUMBS.ARTICLE(store.article.name)]}/>
                <LayoutSection
                    // title={article.name}
                    title={store.article.name}
                >
                    <UiGrid
                        className="p-article"
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 30 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 48 },
                            [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 72 },
                            [MEDIA_POINTS.IS_1366]: { columns: '1fr 316px', gap: 124 }
                        }}
                    >
                        <UiCard>
                            {store.article.detailImageThumbnail && (
                                <img className="p-article__image" src={store.article.detailImageThumbnail} alt=""/>
                            )}
                            <UiTypography>
                                {/*<UiHtml value={store.article.content}/>*/}
                                <div className="ui-html">
                                    <p>
                                        Проверь себя и своих близких! Экспресс-тест Covid-19  для выявления антител IgM и IgG
                                        к COVID-19 уже в продаже. С его помощью можно определить заболевание на начальной
                                        стадии или увидеть результат уже после перенесенной болезни, подтверждающий наличие
                                        иммунитета.
                                    </p>
                                    <p>
                                        Здоровье  бесценно, о нем заботится каждый человек, а в
                                        период всемирной пандемии защита себя и своих близких  становится приоритетной задачей.
                                        Помимо соблюдения  гигиенических мероприятий  и социальной дистанции очень важна
                                        своевременная диагностика заболевания.  Сеть Аптека Вита  предлагает Вам приобрести
                                        Экспресс-тест Covid-19*  для выявления антител   IgM и IgG к COVID-19. С  его помощью
                                        можно определить заболевание на начальной стадии или увидеть результат уже после
                                        перенесенной болезни, подтверждающий наличие  иммунитета.
                                    </p>
                                    <h4>Поэтому, одноразовое заменяем многоразовым:</h4>
                                    <ul>
                                        <li>Вместо одноразовых стаканов используем многоразовые кружки.</li>
                                        <li>Под воду купите многоразовую бутылку, которую можно наполнять.</li>
                                        <li>Не берите пакеты-майки. Ходите в магазин с многоразовой сумкой.</li>
                                        <li>Фасовочные пакеты заменяем на тканевые мешочки, фруктовки.</li>
                                        <li>Одноразовую посуду, приборы и тару для еды на вынос также меняем </li>
                                    </ul>
                                </div>
                            </UiTypography>
                            <div className="p-article__footer">
                                <CLinkButton href={ROUTES.ARTICLES()} label='Все статьи'/>
                                <UiSocialShare/>
                            </div>
                        </UiCard>
                        <div className="p-article-aside">
                            <h3 className="p-article-aside__title">Всё интересное:</h3>
                            <UiGrid
                                media={{
                                    [MEDIA_POINTS.IS_1366]: { columns: 1, gap: 40 }
                                }}
                            >
                                {store.articles.map(article => (
                                    <UiArticleTile
                                        key={article.id}
                                        name={article.name}
                                        href={ROUTES.ARTICLE(article.slug)}
                                        image={article.previewImageThumbnail}
                                        isMedium
                                    />
                                ))}
                            </UiGrid>
                        </div>
                    </UiGrid>
                </LayoutSection>
                <LayoutSection title={'Товары в статье'}>
                    {/*<CCatalogProductsSlider catalogProducts={store.article.catalogProducts}/>*/}
                </LayoutSection>
                <LayoutSection
                    className="p-articles-all"
                    title={'Все интересное:'}
                    headerAside={
                        <UiLink
                            href={ROUTES.ARTICLES()}
                            className={'underline-wave underline-wave--large'}
                        >
                            <span>Смотреть все</span>
                            <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                        </UiLink>
                    }
                >
                    <UiGrid
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_768]: { columns: 3, gap: 16 },
                            [MEDIA_POINTS.IS_1024]: { columns: 4, gap: 16 },
                        }}
                    >
                        {store.articles.map(article => (
                            <UiArticleTile
                                key={article.id}
                                name={article.name}
                                href={ROUTES.ARTICLE(article.slug)}
                                image={article.previewImageThumbnail}
                                isMedium
                            />
                        ))}
                    </UiGrid>
                </LayoutSection>
            </UiWrap>
        </Layout>
    )
});

// export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
//     const application = await getApplicationData();
//     const slug = context.query.slug as string;
//
//     const { isSuccess, data, description } = await Redis.cache(
//         `articlesGetRequest:${slug}`,
//         async () => await articlesGetRequest({ slug }),
//         3600
//     );
//
//     if (!isSuccess || !data?.item) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: ROUTES.ERROR_404()
//             }
//         }
//     }
//
//     return {
//         props: {
//             application,
//             article: data.item,
//             articles: data.items
//         }
//     }
// }

export default ArticleDetailPage;
