import { CatalogFilterModelInterface, PaginationModel } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

export type ParamsType = {
    id?: number[],
    catalogCategoryId?: number,
    cityId?: number,
    query?: string,
    markId?: string[],
    brandId?: number[],
    manufacturerId?: number[],
    substanceId?: number[],
}

type ResponseType = {
    items: CatalogFilterModelInterface[],
    pagination: PaginationModel
}

export const catalogProductsQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-products',
        params,
    });
}
