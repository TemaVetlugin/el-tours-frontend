import { request } from "shared/utilities";
import { ICatalogProductModel, IPaginationModel } from "shared/models";

type ParamsType = {
    id?: number[],
    catalogCategoryId?: number,
}

type ResponseType = {
    items: ICatalogProductModel[],
    pagination: IPaginationModel
}

export const catalogProductsRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-products',
        params,
    });
}
