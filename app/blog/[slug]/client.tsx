'use client';

import React from "react";
import {UiButton, UiIcon, UiLink, UiPage, UiQuote} from "shared/ui";
import {observer} from "mobx-react-lite";

import {homeQuery} from "shared/queries/frontend";
import {ReturnType} from "shared/types";
import {useAsyncEffect, useCity, useDidUpdateEffect, useStore} from "shared/hooks";
import {ArticleModel, BrandModel, CatalogProductModel, HomeBannerModel, ManufacturerModel, NewsModel, PromoActionModel} from "shared/models";
import {COLORS, ROUTES} from "shared/contants";

import {PBlogMediasAside} from "./components/PBlogMediasAside";
import {PBlogFormAside} from "./components/PBlogFormAside";
import {PBlogCommentForm} from "./components/PBlogCommentForm";
import {PBlogComments} from "./components/PBlogComments";
import {UserService} from "shared/services";


type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer((
    {
        homeBanners,
        promoActions,
        brands,
        articles,
        manufacturers,
        news,
        catalogProductsProfit,
        catalogProductsNew,
        catalogProductsPopular
    }: PropsType
) => {
    const city = useCity();

    const store = useStore({
        homeBanners: homeBanners.map(item => new HomeBannerModel(item)),
        promoActions: promoActions.map(item => new PromoActionModel(item)),
        brands: brands.map(item => new BrandModel(item)),
        manufacturers: manufacturers.map(item => new ManufacturerModel(item)),
        articles: articles.map(item => new ArticleModel(item)),
        news: news.map(item => new NewsModel(item)),
        catalogProductsProfit: catalogProductsProfit.map(item => new CatalogProductModel(item)),
        catalogProductsNew: catalogProductsNew.map(item => new CatalogProductModel(item)),
        catalogProductsPopular: catalogProductsPopular.map(item => new CatalogProductModel((item))),
    });

    useDidUpdateEffect(() => {
        (async () => {
            const {isSuccess, data} = await homeQuery({
                cityId: city.id
            });
            if (data && isSuccess) {
                store.set("homeBanners", data.homeBanners.map(item => new HomeBannerModel(item)));
                store.set("promoActions", data.promoActions.map(item => new PromoActionModel(item)));
                store.set("brands", data.brands.map(item => new BrandModel(item)));
                store.set("manufacturers", data.manufacturers.map(item => new ManufacturerModel(item)));
                store.set('articles', data.articles.map(item => new ArticleModel(item)));
                store.set('news', data.news.map(item => new NewsModel(item)));
                store.set('catalogProductsProfit', data.catalogProductsProfit.map(item => new CatalogProductModel(item)));
                store.set('catalogProductsNew', data.catalogProductsNew.map(item => new CatalogProductModel(item)));
                store.set('catalogProductsPopular', data.catalogProductsPopular.map(item => new CatalogProductModel((item))));
            }
        })();
    }, [city]);


    // rehydrate offers
    useAsyncEffect(async () => {
        const {data, isSuccess} = await homeQuery({
            cityId: city.id,
            onlyCatalogProducts: true
        });

        if (data && isSuccess) {
            store.set('catalogProductsProfit', data.catalogProductsProfit.map(item => new CatalogProductModel(item)));
            store.set('catalogProductsNew', data.catalogProductsNew.map(item => new CatalogProductModel(item)));
            store.set('catalogProductsPopular', data.catalogProductsPopular.map(item => new CatalogProductModel((item))));
        }
    }, []);

    return (
        <UiPage className="blog-article-page">
            <div className="blog-article-page-header">
                <UiPage.Wrap>
                    <UiPage.Breadcrumbs items={[ROUTES.BLOG()]}/>
                    <h1>Польские приключения Варшава-Краков-Величка</h1>
                    <div className="blog-article-page-header__properties">
                        <span className="blog-article-page-header__properties__text">10 января, 2018 - Чтение 5 мин</span>
                        <UiIcon size={[24, 24]} name={"views"}/>
                        <span>680</span>
                        <UiIcon size={20} name={"comments"}/>
                        <span>21</span>
                    </div>
                </UiPage.Wrap>
            </div>
            <UiPage.Wrap className="blog-article-page-body">
                <PBlogMediasAside/>
                <div className="blog-article-page-content">
                    <div className="blog-article-page-author">
                        <div className="blog-article-page-author__profile">
                            <img src={require('./assets/authorPicture.png').default.src} alt="" className="blog-article-page-author__profile__picture"/>
                            <div className="blog-article-page-author__profile__descr">
                                <h5>Irishka Traveler</h5>
                                <p>г. Минск</p>
                            </div>
                        </div>
                        <div className="blog-article-page-author__publications">
                            <h5>28 публикаций</h5>
                            <UiLink>Все публикации</UiLink>
                        </div>

                    </div>
                    <p>Было 6 утра 25-го декабря – холодное рождественское утро. Четверо белорусов приехали из Минска на автобусе ecolines в Варшаву на Западный автовокзал. Наша
                        дорога шла в Краков, и мы, используя метро, переместились на автовокзал Dworzec Autobusowy Metro Wilanowska, откуда в 8 утра отправлялся наш автобус.
                        Автобусный Дворец оказался маленькой площадкой для автобусов – без зала ожидания или хотя бы теплой будочки-кассы, без круглосуточного кафе и даже без
                        киоска. Повстречавшийся незнакомец пожал плечами, так и не подсказав теплое круглосуточное местечко поблизости. Мы, четверо белорусов, холодные и замерзшие,
                        блуждали по пустой Варшаве рождественским утром.</p>
                    <div className="blog-article-page__images">
                        <div className="blog-article-page__images__item">
                        </div>
                        <div className="blog-article-page__images__item">
                        </div>
                    </div>
                    <UiQuote>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                        (причем
                        имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                        подходят отели или нет.</UiQuote>
                    <h5 className="blog-article-page__title">Привет с глубины 125 метров</h5>
                    <p>Шахтерский маршрут начинается с обмундирования – шахтерская рабочая одежда, фонарик и другие ценные приспособления, и вперед в темноту – так начинается
                        ролевая игра. В каждой камере находится новый механизм, используемый в шахтерских работах, и мы проделываем крошечный кусочек работы, чтобы соприкоснуться с
                        этим ремеслом. Все задания в шахте очень простые – это сделано в целях безопасности и доступности данного маршрута для всех желающих, без ограничений. По
                        завершению шахтерского маршрута каждый получил сертификат о посвящении в шахтеры – трасса успешно пройдена!</p>
                    <div className="blog-article-page__links">
                        <h5>Полезные ссылки:</h5>
                        <div className="blog-article-page__links__item">
                        <div className="blog-article-page__links__round"></div>
                        <span>Автобусы ecolines (Минск-Варшава): </span><UiLink>https://ecolines.by</UiLink>
                        </div>
                        <div className="blog-article-page__links__item">
                        <div className="blog-article-page__links__round"></div>
                        <span>Внутренние автобусы в Польше: </span><UiLink>http://www.polskibus.com/pl/index.html</UiLink>
                        </div>
                        <div className="blog-article-page__links__item">
                        <div className="blog-article-page__links__round"></div>
                        <span>Соляная шахта «Величка»: </span><UiLink>http://www.wieliczka.ru/</UiLink>
                        </div>
                    </div>
                    <div className="blog-article-page__like">
                        <span>Лайкнуть - это модно!</span>
                        <div className="blog-article-page__like__count">
                            <p>Понравилось: 283</p>
                            <UiButton
                                notification={UserService.user.userFavorites.length}
                                template={'icon'}
                                colors={{
                                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    border: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={15} name={'like'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                        </div>
                    </div>

                </div>
                <PBlogFormAside/>
            </UiPage.Wrap>
            <UiPage.Wrap className="blog-article-page-body">
                <div className="blog-article-page__offset"></div>
                <div className="blog-article-page-content">
                    <PBlogComments/>
                </div>
                <PBlogCommentForm/>
            </UiPage.Wrap>
        </UiPage>
    );
});
