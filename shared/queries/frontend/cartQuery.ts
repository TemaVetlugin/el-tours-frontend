import { CatalogProductModelInterface, StoreModelInterface } from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number | null
}

export type ResponseType = {
    deliveryStore: StoreModelInterface,
    recommendations: CatalogProductModelInterface[]
}

export const cartQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/cart',
        params
    });
}
