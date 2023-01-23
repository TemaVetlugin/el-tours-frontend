import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import {
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
    newsItem: IArticleModel,
    news: IArticleModel[],
}

// const NewsDetailPage: NextPage<PropsType> = observer(({ application, article, articles }: PropsType) => {
//     BootstrapModule.application(application);
//
//     const store = useObservable({
//         article: new ArticleModel(article),
//         articles: articles.map(article => new ArticleModel(article)),
//     });
//
//     useEffect(() => {
//         store.update({
//             article: new ArticleModel(article),
//             articles: articles.map(article => new ArticleModel(article)),
//         });
//     }, [article, store, articles])
//
//     return (
//         <Layout>
//             <UiSeo
//                 title={store.article.name}
//                 image={store.article.previewImageThumbnail}
//             />
//             <UiWrap>
//                 <UiBreadcrumbs items={[MENU.NEWS(), MENU.NEWS_DETAIL(store.article.name)]}/>
//                 <LayoutTitle value={article.name}/>
//                 <UiGrid
//                     className="p-news-detail"
//                     media={{
//                         [MEDIA_POINTS.IS_360]: { columns: 1, gap: 30 },
//                         [MEDIA_POINTS.IS_768]: { columns: 1, gap: 48 },
//                         [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 72 },
//                         [MEDIA_POINTS.IS_1366]: { columns: '1fr 310px', gap: 40 }
//                     }}
//                 >
//                     <UiCard>
//                         {store.article.detailImageThumbnail && (
//                             <img className="p-news-detail__image" src={store.article.detailImageThumbnail} alt=""/>
//                         )}
//                         <h2 className="p-news-detail__title">{store.article.name}</h2>
//                         {store.article.publishedAt && (
//                             <time className="p-news-detail__date">{formatDate(store.article.publishedAt)}</time>
//                         )}
//                         <UiTypography>
//                             <UiHtml value={store.article.content}/>
//                         </UiTypography>
//                         <div className="p-news-detail__footer">
//                             <CLinkButton href={ROUTES.NEWS()} label='Ко всем статьям'/>
//                             <UiSocialShare/>
//                         </div>
//                     </UiCard>
//                     <div className="p-news-detail-aside">
//                         <h3 className="p-news-detail-aside__title">Другие статьи</h3>
//                         <UiGrid
//                             media={{
//                                 [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
//                                 [MEDIA_POINTS.IS_768]: { columns: 2, gap: 28 },
//                                 [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 29 },
//                                 [MEDIA_POINTS.IS_1366]: { columns: 1, gap: 24 }
//                             }}
//                         >
//                             {store.articles.map(article => (
//                                 <UiArticleTile
//                                     isSmall
//                                     key={article.id}
//                                     name={article.name}
//                                     href={ROUTES.ARTICLE(article.slug)}
//                                     image={article.previewImageThumbnail}
//                                 />
//                             ))}
//                         </UiGrid>
//                     </div>
//                 </UiGrid>
//                 <LayoutSection title={'Товары в статье'}>
//                     <CCatalogProductsSlider catalogProducts={store.article.catalogProducts}/>
//                 </LayoutSection>
//             </UiWrap>
//         </Layout>
//     )
// });
//
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

const NewsDetailPage: NextPage<PropsType> = observer(({ application, newsItem, news }: PropsType) => {
    // BootstrapModule.application(application);
    //
    // const store = useObservable({
    //     newsItem: new ArticleModel(article),
    //     news: articles.map(newsItem => new ArticleModel(newsItem)),
    // });
    //
    // useEffect(() => {
    //     store.update({
    //         newsItem: new ArticleModel(article),
    //         news: news.map(newsItem => new ArticleModel(newsItem)),
    //     });
    // }, [newsItem, store, news])

    const store = {
        news: {},
        newsItem: {
            name: 'Аллергический ринит: что делать при первых симптомах?',
            detailImageThumbnail: 'https://via.placeholder.com/400x490'
        }
    }

    return (
        <Layout>
            <UiSeo
                title={store.newsItem.name}
                // image={store.newsItem.previewImageThumbnail}
            />
            <UiWrap>
                <UiBreadcrumbs items={[MENU.NEWS(), MENU.NEWS_DETAIL(store.newsItem.name)]}/>
                <UiGrid media={{
                    [MEDIA_POINTS.IS_768]: { columns: '640px' }
                }}>
                    <LayoutTitle value={store.newsItem.name}/>
                </UiGrid>
                <LayoutSection>
                    <UiGrid
                        className="p-news-detail"
                        media={{
                            [MEDIA_POINTS.IS_1366]: { columns: '1fr 310px', gap: 20 }
                        }}
                    >
                        <UiCard>
                            <UiTypography>
                                {store.newsItem.detailImageThumbnail && (
                                    <img className="p-news-detail__image" src={store.newsItem.detailImageThumbnail} alt=""/>
                                )}
                                {/*<UiHtml value={store.newsItem.content}/>*/}
                                <div className="ui-html">
                                    <p>
                                        Проверь себя и своих близких! Экспресс-тест Covid-19 для выявления антител IgM и IgG
                                        к COVID-19 уже в продаже. С его помощью можно определить заболевание на начальной
                                        стадии или увидеть результат уже после перенесенной болезни, подтверждающий наличие
                                        иммунитета.
                                    </p>
                                    <p>
                                        Здоровье  бесценно, о нем заботится каждый человек, а в период всемирной
                                        пандемии защита себя и своих близких  становится приоритетной задачей.  Помимо соблюдения
                                        гигиенических мероприятий  и социальной дистанции очень важна своевременная диагностика
                                        заболевания.  Сеть Аптека Вита  предлагает Вам приобрести Экспресс-тест Covid-19*
                                        для выявления антител   IgM и IgG к COVID-19. С  его помощью можно определить заболевание
                                        на начальной стадии или увидеть результат уже после перенесенной болезни.
                                        Проверь себя и своих близких! Экспресс-тест Covid-19 для выявления антител IgM и IgG
                                        к COVID-19 уже в продаже. С его помощью можно определить заболевание на начальной стадии
                                        или увидеть результат уже после перенесенной болезни, подтверждающий наличие  иммунитета.
                                    </p>
                                    <p>
                                        Здоровье бесценно, о нем заботится каждый человек, а в  период всемирной пандемии
                                        защита себя и своих близких  становится приоритетной задачей.  Помимо соблюдения
                                        гигиенических мероприятий  и социальной дистанции очень важна своевременная диагностика
                                        заболевания.  Сеть Аптека Вита  предлагает Вам приобрести Экспресс-тест Covid-19*
                                        для выявления антител   IgM и IgG к COVID-19. С  его помощью можно определить заболевание
                                        на начальной стадии или увидеть результат уже после перенесенной болезни, подтверждающий
                                        наличие  иммунитета.
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
                            <div className="p-news-detail__footer">
                                <CLinkButton href={ROUTES.NEWS()} label='Все статьи'/>
                                <UiSocialShare/>
                            </div>
                        </UiCard>
                    </UiGrid>
                </LayoutSection>
                <LayoutSection title={'Другие новости:'}>

                </LayoutSection>
                <LayoutSection title={'Товары в статье'}>
                    {/*<CCatalogProductsSlider catalogProducts={store.newsItem.catalogProducts}/>*/}
                </LayoutSection>
            </UiWrap>
        </Layout>
    )
});

export default NewsDetailPage;
