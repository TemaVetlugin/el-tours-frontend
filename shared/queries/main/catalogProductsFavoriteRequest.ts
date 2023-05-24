import { request } from "shared/utilities";

type PayloadType = {
    id: number
}

type ResponseType = {
    items: number[]
}

export const catalogProductsFavoriteRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/catalog-products/favorite',
        payload,
    });
}
