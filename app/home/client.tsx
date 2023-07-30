'use client';

import React from "react";
import { UiPage } from "shared/ui";
import { observer } from "mobx-react-lite";

import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { useAsyncEffect, useCity, useDidUpdateEffect, useObservable } from "shared/hooks";
import { ArticleModel, BrandModel, CatalogProductModel, HomeBannerModel, ManufacturerModel, NewsModel, PromoActionModel } from "shared/models";
import { ROUTES } from "shared/contants";

import { PHomeBanners } from "./components/PHomeBanners";
import { PHomeBrandsAndManufacturers } from "./components/PHomeBrandsAndManufacturers";
import { PHomePromoActions } from "./components/PHomePromoActions";
import { PHomeArticles } from "./components/PHomeArticles";
import { PHomeNews } from "./components/PHomeNews";
import { PHomeCatalogProducts } from "./components/PHomeCatalogProducts";

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

    const store = useObservable({
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
            const { isSuccess, data } = await homeQuery({
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
        const { data, isSuccess } = await homeQuery({
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
                <PHomeBanners homeBanners={store.homeBanners}/>
                <PHomePromoActions promoActions={store.promoActions}/>
                <PHomeBrandsAndManufacturers manufacturers={store.manufacturers} brands={store.brands}/>
                <PHomeCatalogProducts
                    title={'Выгодно'}
                    href={ROUTES.CATALOG_MARK('discount')}
                    contentResourceCode={'home.catalog-products-profit'}
                    catalogProducts={store.catalogProductsProfit}
                />
                <PHomeArticles articles={store.articles}/>
                <PHomeCatalogProducts
                    title={'Новинки'}
                    href={ROUTES.CATALOG_MARK('new')}
                    contentResourceCode={'home.catalog-products-new'}
                    catalogProducts={store.catalogProductsNew}
                />
                <PHomeNews news={store.news}/>
                <PHomeCatalogProducts
                    title={'Популярное'}
                    href={ROUTES.CATALOG_MARK('popular')}
                    contentResourceCode={'home.catalog-products-popular'}
                    catalogProducts={store.catalogProductsPopular}
                />
            </UiPage.Wrap>
        </UiPage>
    );
});
