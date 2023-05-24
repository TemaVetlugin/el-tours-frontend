import { request } from "shared/utilities";
import { ICatalogProductModel, IPaginationModel } from "shared/models";

type ParamsType = {
    query: string
}

type ResponseType = {
    items: ICatalogProductModel[],
    pagination: IPaginationModel
}

export const catalogProductsSearchRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-products/search',
        params,
    });
}
