import { request } from "shared/utilities";

type PayloadType = {
    name: string
    email: string
    phone: string
    content: string
    catalogProductId: number
}

type ResponseType = {
}

export const catalogProductFeedbacksCreateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/catalog-product-feedbacks/create',
        payload,
    });
}
