import {
    ArticleModelInterface,
    BrandModelInterface,
    CatalogProductModelInterface,
    HomeBannerModelInterface,
    ManufacturerModelInterface,
    PromoActionModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number | null
}

export type ResponseType = {
    homeBanners: HomeBannerModelInterface[],
    promoActions: PromoActionModelInterface[],
    brands: BrandModelInterface[],
    manufacturers: ManufacturerModelInterface[],
    articles: ArticleModelInterface[],
    news: ArticleModelInterface[],
    catalogProductsProfit: CatalogProductModelInterface[],
    catalogProductsNew: CatalogProductModelInterface[],
    catalogProductsPopular: CatalogProductModelInterface[],
}

export const homeQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/home',
        params
    });
}
