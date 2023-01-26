import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next';
import React from "react";

import { Layout, LayoutSection } from "shared/layout";
import { getApplicationData, Redis } from "shared/server";
import { ApplicationDataType, ReturnType } from "shared/types";
import {
    ArticleModel,
    CatalogCategoryModel,
    CatalogProductModel, CompilationModel,
    HomeBannerModel,
    HomeWhyTrustModel,
    FeedbackModel,
    PromoActionModel2
} from "shared/models";
import { UiSeo, UiWrap } from "shared/uikit";
import { homeRequest } from "shared/requests/frontend";
import { BootstrapModule } from "shared/modules";
import { useObservable } from "shared/hooks";

import { PHomeSlider } from "./components/PHomeSlider";
import { PHomeHot } from "./components/PHomeHot";
import { PHomeFeedbacks } from "./components/PHomeFeedbacks";
import { PHomeArticles } from "./components/PHomeArticles";
import { PHomeWhyTrusts } from "./components/PHomeWhyTrusts";
import { PHomeCompilations } from "./components/PHomeCompilations";
import { PHomeCatalogCategories } from "./components/PHomeCatalogCategories";
import { PHomeAbout } from "./components/PHomeAbout";
import { PHomeAlphabet } from "./components/PHomeAlphabet";
import { PHomeDiscountCards } from "./components/PHomeDiscountCards";
import { PHomePromoActions } from "./components/PHomePromoActions";

import './index.scss';

type PropsType = {
    application: ApplicationDataType,
} & NonNullable<ReturnType<typeof homeRequest>['data']>;

const promo = [
    {
        id: 0,
        name: 'Выгодное предложение',
        previewImageThumbnail: 'https://via.placeholder.com/310x174',
        slug: 'promo-detail',
        badge: 'Осталось 8 дней',
    },
    {
        id: 1,
        name: 'Чтобы проблемы с кишечником не застали врасплох',
        previewImageThumbnail: 'https://via.placeholder.com/310x174',
        slug: 'promo-detail',
        badge: 'Осталось 8 дней'
    },
    {
        id: 2,
        name: 'Выгодное предложение',
        previewImageThumbnail: 'https://via.placeholder.com/310x174',
        slug: 'promo-detail',
        badge: 'Осталось 8 дней'
    },
    {
        id: 3,
        name: 'Чтобы проблемы с кишечником не застали врасплох',
        previewImageThumbnail: 'https://via.placeholder.com/310x174',
        slug: 'promo-detail',
        badge: 'Осталось 8 дней'
    },
];

const articles = [
    {
        id: 0,
        name: 'Чтобы проблемы с кишечником не застали врасплох',
        previewImageThumbnail: 'https://via.placeholder.com/420x236',
        slug: 'detail',
        isLarge: true
    },
    {
        id: 1,
        name: 'Выгодное предложение',
        previewImageThumbnail: 'https://via.placeholder.com/420x236',
        slug: 'detail',
    },
    {
        id: 2,
        name: 'Снижение цены',
        previewImageThumbnail: 'https://via.placeholder.com/420x236',
        slug: 'detail',
    },
];

const HomePage: NextPage<PropsType> = observer((
    {
        application,
        homeBanners,
        hotCatalogProducts,
        feedbacks,
        // articles,
        homeWhyTrusts,
        catalogCategories,
        compilations,
    }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        homeBanners: homeBanners.map(item => new HomeBannerModel(item)),
        hotCatalogProducts: hotCatalogProducts.map(item => new CatalogProductModel(item)),
        feedbacks: feedbacks.map(item => new FeedbackModel(item)),
        articles: articles.map(item => new ArticleModel(item)),
        homeWhyTrusts: homeWhyTrusts.map(item => new HomeWhyTrustModel(item)),
        catalogCategories: catalogCategories.map(item => new CatalogCategoryModel(item)),
        compilations: compilations.map(item => new CompilationModel(item)),
        promoActions: promo.map(item => new PromoActionModel2(item)),
    });

    return (
        <Layout>
            <UiSeo title={'Аптека Я+'}/>
            <UiWrap>
                <PHomePromoActions promoActions={store.promoActions}/>
                <PHomeArticles articles={store.articles}/>

                <PHomeSlider homeBanners={store.homeBanners}/>
                <PHomeHot catalogProducts={store.hotCatalogProducts}/>
                <PHomeDiscountCards/>
                <PHomeWhyTrusts homeWhyTrusts={store.homeWhyTrusts}/>
                <PHomeCompilations compilations={store.compilations}/>
                <LayoutSection
                    title={'В нашем каталоге более 3000 товаров'}
                    style={{ title: { textAlign: "center", display: "block" } }}
                >
                    <PHomeCatalogCategories catalogCategories={store.catalogCategories}/>
                    <PHomeAlphabet/>
                </LayoutSection>
                <PHomeFeedbacks reviews={store.feedbacks}/>
                {/*<PHomeArticles articles={store.articles}/>*/}
                <PHomeAbout/>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const props: PropsType = {
        application: await getApplicationData(),
        homeBanners: [],
        hotCatalogProducts: [],
        feedbacks: [],
        articles: [],
        homeWhyTrusts: [],
        catalogCategories: [],
        compilations: []
    }

    const { isSuccess, data } = await Redis.cache('homeRequest', async () => await homeRequest(), 3600);

    if (isSuccess && data) {
        return {
            props: {
                ...props,
                ...data
            }
        }
    }

    return { props }
}

export default HomePage;
