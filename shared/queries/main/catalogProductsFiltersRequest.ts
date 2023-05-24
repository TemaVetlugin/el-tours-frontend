import { request } from "shared/utilities";
import { ICatalogFilterModel } from "shared/models";

type ParamsType = {
    query?: string,
    catalogCategoryId?: number,
}

type ResponseType = {
    aside: ICatalogFilterModel[]
    header: ICatalogFilterModel[]
}

export const catalogProductsFiltersRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-products/filters',
        params,
    });
}
