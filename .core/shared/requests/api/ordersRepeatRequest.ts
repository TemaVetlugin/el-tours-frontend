import { request } from "shared/utilities";
import { ICartItemModel } from "shared/models";

type PayloadType = {
    id: number
}

type ResponseType = {
    cartItems: ICartItemModel[]
}

export const ordersRepeatRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/orders/repeat',
        payload,
    });
}
