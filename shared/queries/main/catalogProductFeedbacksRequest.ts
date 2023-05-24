import { request } from "shared/utilities";
import { ICatalogProductFeedbackModel } from "shared/models";

type ParamsType = {
    catalogProductId: number
}

type ResponseType = {
    items: ICatalogProductFeedbackModel[]
}

export const catalogProductFeedbacksRequest = async (params?: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/catalog-product-feedbacks',
        params,
    });
}
