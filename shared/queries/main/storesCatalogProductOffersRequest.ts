import { request } from "shared/utilities";
import { IStoreModel } from "shared/models";

type ParamsType = {
    catalogProductId: number[]
}

type ResponseType = {
    items: IStoreModel[]
}

export const storesCatalogProductOffersRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/stores/catalog-product-offers',
        params,
    });
}
