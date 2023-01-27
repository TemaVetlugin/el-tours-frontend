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
    PromoActionModel2,
    BadgeModel, BrandModel2, HomePromoBannerModel, NewsModel
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
import { PHomeBrands } from "./components/PHomeBrands";
import { PHomePromoBanners } from "./components/PHomePromoBanners";
import { PHomeNews } from "./components/PHomeNews";

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

const brands = [
    {
        id: 0,
        name: 'Nutricia',
        img: '/assets/images/brands/image1.png'
    },
    {
        id: 1,
        name: 'Канонфарма',
        img: '/assets/images/brands/image2.png'
    },
    {
        id: 2,
        name: 'Эвалар',
        img: '/assets/images/brands/image3.png'
    },
    {
        id: 3,
        name: 'Пенталгин',
        img: '/assets/images/brands/image4.png'
    },
    {
        id: 4,
        name: 'Асна',
        img: '/assets/images/brands/image5.png'
    },
]

const promoBanners = [
    {
        id: 0,
        href: '#',
        image: '/assets/images/promoBanners/image.png',
        imageMD: '/assets/images/promoBanners/image-1024.png',
        imageSM: '/assets/images/promoBanners/image-768.png',
        imageXS: '/assets/images/promoBanners/image-320.png',
    },
];

const news = [
    {
        id: 0,
        name: 'Бережем нервы. Как избавиться от стресса',
        description: 'Различное расположение абсурдно начинает генезис свободного стиха, хотя в существование или актуальность этого он...',
        previewImageThumbnail: 'https://dummyimage.com/310x380',
        slug: 'news-detail'
    },
    {
        id: 1,
        name: 'Бережем нервы. Как избавиться от стресса',
        description: 'Различное расположение абсурдно начинает генезис свободного стиха, хотя в существование или актуальность этого он...',
        previewImageThumbnail: 'https://dummyimage.com/310x380',
        slug: 'news-detail'
    },
    {
        id: 2,
        name: 'План поддержки здоровья летом',
        description: 'Различное расположение абсурдно начинает генезис свободного стиха, хотя в существование или актуальность этого он...',
        previewImageThumbnail: 'https://dummyimage.com/310x380',
        slug: 'news-detail'
    },
    {
        id: 3,
        name: 'План поддержки здоровья летом',
        description: 'Различное расположение абсурдно начинает генезис свободного стиха, хотя в существование или актуальность этого он...',
        previewImageThumbnail: 'https://dummyimage.com/310x380',
        slug: 'news-detail'
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
        brands: brands.map(item => new BrandModel2(item)),
        promoBanners: promoBanners.map(item => new HomePromoBannerModel(item)),
        news: news.map(item => new NewsModel(item)),
    });

    return (
        <Layout>
            <UiSeo title={'Аптека Я+'}/>
            <UiWrap>
                <PHomePromoActions promoActions={store.promoActions}/>
                <PHomeBrands brands={store.brands}/>
                <PHomeArticles articles={store.articles}/>
                <PHomeNews news={store.news}/>
                <PHomePromoBanners promoBanners={store.promoBanners}/>

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
