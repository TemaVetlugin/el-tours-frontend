'use client';

import React from "react";
import {UiPage} from "shared/ui";
import {observer} from "mobx-react-lite";

import {homeQuery} from "shared/queries/frontend";
import {ReturnType} from "shared/types";
import {useAsyncEffect, useCity, useDidUpdateEffect, useStore} from "shared/hooks";
import {ArticleModel, BrandModel, CatalogProductModel, HomeBannerModel, ManufacturerModel, NewsModel, PromoActionModel} from "shared/models";
import {ROUTES} from "shared/contants";

import {PHomeBanners} from "./components/PHomeBanners";
import {PHomeBrandsAndManufacturers} from "./components/PHomeBrandsAndManufacturers";
import {PHomePromoActions} from "./components/PHomePromoActions";
import {PHomeArticles} from "./components/PHomeArticles";
import {PHomeNews} from "./components/PHomeNews";
import {PHomeCatalogProducts} from "./components/PHomeCatalogProducts";

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
        <UiPage>
            <UiPage.Wrap>
                <div className="typical-page">
                    <div className="typical-page-article">
                        <div className="typical-page-article__column">
                            <h1>Чем заняться в Лондоне с детьми:
                                8 идей для всей семьи</h1>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам ерезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ... </p>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам перезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ...</p>
                        </div>
                        <img src={require('./assets/example.png').default.src} className="typical-page-article__column_img" alt=""/>
                    </div>
                    <div className="typical-page-quote">
                        <div className="typical-page-quote__img"></div>
                        <div className="typical-page-quote__column">
                            <p>
                                Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет.
                            </p>
                        </div>
                    </div>
                    <div className="typical-page-article">
                        <div className="typical-page-article__column">
                            <h1>Чем заняться в Лондоне с детьми:
                                8 идей для всей семьи</h1>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам ерезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ... </p>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам перезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ...</p>
                        </div>
                    </div>
                    <h1>Чем заняться в Лондоне с детьми:
                        8 идей для всей семьи</h1>
                    <div className="typical-page-article">
                        <div className="typical-page-article__column">
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам ерезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ... </p>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам перезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ...</p>
                        </div>
                        <div className="typical-page-article__column">
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам ерезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ... </p>
                            <p>Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты
                                (причем
                                имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял
                                подходят отели или нет. Наташа по всем вариантам перезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ...</p>
                        </div>
                    </div>
                </div>
            </UiPage.Wrap>
        </UiPage>
    );
});
