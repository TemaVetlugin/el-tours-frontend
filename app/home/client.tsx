'use client';

import React from "react";
import {UiButton, UiIcon, UiPage, UiSelect} from "shared/ui";
import {observer} from "mobx-react-lite";

import {homeQuery} from "shared/queries/frontend";
import {ReturnType} from "shared/types";
import {useAsyncEffect, useCity, useDidUpdateEffect, useStore} from "shared/hooks";
import {ArticleModel, BrandModel, CatalogProductModel, HomeBannerModel, ManufacturerModel, NewsModel, PromoActionModel} from "shared/models";
import {COLORS, ROUTES} from "shared/contants";

import {PBlogMediasAside} from "./components/PBlogMediasAside";
import {PBlogFormAside} from "./components/PBlogFormAside";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import {LayoutHeader} from "shared/layout";
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
        <>
            <LayoutHeader template={"home"}/>
            <div className="home-page">
                <div className="home-page-main">

                    <UiPage.Wrap>
                        <div className="home-page-main-search">
                            <div className="home-page-main-search-headers">
                                <div className="home-page-main-search-headers__button_active">
                                    <h5>Туры</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Авиабилеты</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Отели</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Перелет+отель</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Круизы</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Аренда авто</h5>
                                </div>
                                <div className="home-page-main-search-headers__button">
                                    <h5>Недвижимость</h5>
                                </div>
                            </div>
                            <div className="home-page-main-search-content">
                                <div className="home-page-main-search-content-city">
                                    <h5>Город вылета</h5>
                                    <div className="home-page-main-search-content__wrap">
                                        <p>Нижний Новгород</p>
                                        <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                    </div>
                                </div>
                                <div className="home-page-main-search-content-country">
                                    <h5>Страна, курорт или отель</h5>
                                    <div className="home-page-main-search-content__wrap">
                                        <p>Греция</p>
                                        <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                    </div>
                                </div>
                                <div className="home-page-main-search-content-date">
                                    <h5>Дата вылета</h5>
                                    <div className="home-page-main-search-content__wrap">
                                        <p>с 9 авг</p>
                                        <UiIcon size={16} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                                    </div>
                                </div>
                                <div className="home-page-main-search-content-nights">
                                    <h5>Ночей</h5>
                                    <div className="home-page-main-search-content__wrap">
                                        <p>на 7-8 ночей</p>
                                        <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                                    </div>
                                </div>
                                <div className="home-page-main-search-content-tourists">
                                    <h5>Туристов</h5>
                                    <div className="home-page-main-search-content__wrap">
                                        <p>2 взрослых</p>
                                        <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                                    </div>
                                </div>
                                <UiButton
                                    notification={UserService.user.userFavorites.length}

                                >
                                    <UiIcon size={24} name={'search'}/>
                                </UiButton>

                            </div>
                        </div>

                    </UiPage.Wrap>
                    <div className="home-page-main__blackout"></div>

                </div>
            </div>
        </>
    );
});
