import { BrandModelInterface, HomeBannerModelInterface, PromoActionModelInterface } from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number | null
}

export type ResponseType = {
    homeBanners: HomeBannerModelInterface[],
    promoActions: PromoActionModelInterface[],
    brands: BrandModelInterface[],
}

export const homeQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/home',
        params
    });
}
