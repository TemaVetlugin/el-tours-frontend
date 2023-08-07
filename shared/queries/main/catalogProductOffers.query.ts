import { CatalogProductOfferModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

export type ParamsType = {
    catalogProductId?: number,
    cityId: number,
    isHydrate?: boolean
}

type ResponseType = {
    items: CatalogProductOfferModelInterface[],
}

export const catalogProductOffersQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-product-offers',
        params,
    });
}
