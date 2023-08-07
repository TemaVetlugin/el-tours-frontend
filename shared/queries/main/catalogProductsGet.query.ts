import { CatalogProductModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

export type ParamsType = {
    slug?: string,
    cityId?: number,
    isHydrate?: boolean
}

type ResponseType = {
    item: CatalogProductModelInterface,
}

export const catalogProductsGetQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-products/get',
        params,
    });
}
