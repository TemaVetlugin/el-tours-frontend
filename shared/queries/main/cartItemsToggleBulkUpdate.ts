import { request } from "shared/utilities";

type PayloadType = {
    cartItems: {
        catalogProductId: number,
        isActive: number
    }[]
}

type ResponseType = {
}

export const cartItemsToggleBulkUpdate = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/cart-items/bulk-update',
        payload,
    });
}
