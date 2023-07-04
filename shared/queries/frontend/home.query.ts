import { HomeBannerModelInterface } from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number | null
}

export type ResponseType = {
    homeBanners: HomeBannerModelInterface[]
}

export const homeQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/home',
        params
    });
}
