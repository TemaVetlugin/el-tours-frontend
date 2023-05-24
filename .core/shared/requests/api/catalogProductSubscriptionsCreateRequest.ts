import { request } from "shared/utilities";

type PayloadType = {
    email: string,
    catalogProductId: number
}

type ResponseType = {
}

export const catalogProductSubscriptionsCreateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/catalog-product-subscriptions/create',
        payload,
    });
}
