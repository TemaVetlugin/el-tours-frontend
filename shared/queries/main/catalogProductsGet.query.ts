import { CatalogProductModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

export type ParamsType = {
    slug?: string
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
