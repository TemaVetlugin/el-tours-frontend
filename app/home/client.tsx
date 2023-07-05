'use client';

import React from "react";
import { UiPage } from "shared/ui";
import { observer } from "mobx-react-lite";
import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { PHomeBanners } from "./components/PHomeBanners";
import { PHomePromoActions } from "./components/PHomePromoActions";
import { useCity, useDidUpdateEffect, useObservable } from "shared/hooks";
import {
    ArticleModel,
    BrandModel,
    CatalogProductModel,
    HomeBannerModel,
    NewsModel,
    PromoActionModel
} from "shared/models";
import { PHomeBrands } from "./components/PHomeBrands";
import { PHomeArticles } from "./components/PHomeArticles";
import { PHomeNews } from "./components/PHomeNews";
import { PHomeCatalogProductsProfit } from "./components/PHomeCatalogProductsProfit";
import { PHomeCatalogProductsNew } from "./components/PHomeCatalogProductsNew";
import { PHomeCatalogProductsPopular } from "./components/PHomeCatalogProductsPopular";

type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer((
    {
        homeBanners,
        promoActions,
        brands,
        articles,
        news,
        catalogProductsProfit,
        catalogProductsNew,
        catalogProductsPopular
    }: PropsType
) => {
    const city = useCity();

    const store = useObservable({
        homeBanners: homeBanners.map(item => new HomeBannerModel(item)),
        promoActions: promoActions.map(item => new PromoActionModel(item)),
        brands: brands.map(item => new BrandModel(item)),
        articles: articles.map(item => new ArticleModel(item)),
        news: news.map(item => new NewsModel(item)),
        catalogProductsProfit: catalogProductsProfit.map(item => new CatalogProductModel(item)),
        catalogProductsNew: catalogProductsNew.map(item => new CatalogProductModel(item)),
        catalogProductsPopular: catalogProductsPopular.map(item => new CatalogProductModel((item))),
    });

    useDidUpdateEffect(() => {
        (async () => {
            const { isSuccess, data } = await homeQuery({
                cityId: city.id
            });
            if (data && isSuccess) {
                store.set("homeBanners", data.homeBanners.map(item => new HomeBannerModel(item)));
                store.set("promoActions", data.promoActions.map(item => new PromoActionModel(item)));
                store.set("brands", data.brands.map(item => new BrandModel(item)));
                store.set('articles', data.articles.map(item => new ArticleModel(item)));
                store.set('news', data.news.map(item => new NewsModel(item)));
                store.set('catalogProductsProfit', data.catalogProductsProfit.map(item => new CatalogProductModel(item)));
                store.set('catalogProductsNew', data.catalogProductsNew.map(item => new CatalogProductModel(item)));
                store.set('catalogProductsPopular', data.catalogProductsPopular.map(item => new CatalogProductModel((item))));
            }
        })();
    }, [city])

    return (
        <UiPage>
            <UiPage.Wrap>
                <PHomeBanners homeBanners={store.homeBanners}/>
                <PHomePromoActions promoActions={store.promoActions}/>
                <PHomeBrands brands={store.brands}/>
                <PHomeCatalogProductsProfit catalogProducts={store.catalogProductsProfit}/>
                <PHomeArticles articles={store.articles}/>
                <PHomeCatalogProductsNew catalogProducts={store.catalogProductsProfit}/>
                <PHomeNews news={store.news}/>
                <PHomeCatalogProductsPopular catalogProducts={store.catalogProductsProfit}/>
            </UiPage.Wrap>
        </UiPage>
    );
});
