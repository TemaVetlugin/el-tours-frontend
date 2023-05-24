import { request } from "shared/utilities";
import { ICartItemModel } from "shared/models";

type PayloadType = {
    catalogProductId: number,
    quantity: number | null,
    withCartItems?: boolean
}

type ResponseType = {
    items: ICartItemModel[]
}

export const cartItemsUpdateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/cart-items/update',
        payload,
    });
}
