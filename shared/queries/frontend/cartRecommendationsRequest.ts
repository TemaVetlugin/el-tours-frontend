import { request } from "shared/utilities";
import { ICatalogProductModel } from "shared/models";

type ResponseType = {
    items: ICatalogProductModel[]
}

export const cartRecommendationsRequest = async () => {
    return await request.get<ResponseType>({
        prefix: '/frontend/v1',
        endpoint: '/cart/recommendations',
    });
}
