import { request } from "shared/utilities";

type PayloadType = {
    email: string
}

type ResponseType = {
}

export const newsSubscriptionCreateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/news-subscription/create',
        payload,
    });
}
