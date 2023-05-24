import { request } from "shared/utilities";
import { ICatalogProductOfferModel } from "shared/models";

type ParamsType = {
    withStore?: number,
    catalogProductId: number[]
}

type ResponseType = {
    items: ICatalogProductOfferModel[]
}

export const catalogProductOffersRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-product-offers/',
        params,
    });
}
