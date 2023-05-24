import { request } from "shared/utilities";
import { ICatalogProductModel } from "shared/models";

type ParamsType = {
    slug: string,
}

type ResponseType = {
    item: ICatalogProductModel,
    substitutes: ICatalogProductModel[],
    recommendations: ICatalogProductModel[],
}

export const catalogProductsGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-products/get',
        params,
    });
}
