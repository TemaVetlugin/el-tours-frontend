import { CatalogFilterModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

type ParamsType = {
    query?: string,
    cityId?: number,
    catalogCategoryId?: number,
}

type ResponseType = {
    items: CatalogFilterModelInterface[]
}

export const catalogProductsFiltersQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-products/filters',
        params
    });
}
