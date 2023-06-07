import { request } from "shared/utilities";
import { ICatalogProductModel, IPaginationModel } from "shared/models";

type ParamsType = {
    catalogCategoryId?: number,
}

type ResponseType = {
    items: ICatalogProductModel[],
    pagination: IPaginationModel
}

export const catalogProductsRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/main/catalog-products',
        params,
    });
}
