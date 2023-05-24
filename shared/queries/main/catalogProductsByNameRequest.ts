import { request } from "shared/utilities";
import { ICatalogProductModel } from "shared/models";

type ParamsType = {
    query: string[]
}

type ResponseType = {
    items: ICatalogProductModel[]
}

export const catalogProductsByNameRequest = async (params?: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-products/by-name',
        params,
    });
}
