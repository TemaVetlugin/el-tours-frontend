import { request } from "shared/utilities";
import { ICartItemModel, IOrderModel, IUserModel } from "shared/models";

type PayloadType = {
    userFirstname: string,
    userLastname: string,
    userMiddlename: string,
    userEmail: string,
    userPhone: string,
    storeId: number | null,
}

type ResponseType = {
    user: IUserModel,
    order: IOrderModel,
    cartItems: ICartItemModel[]
}

export const ordersCreateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/orders/create',
        payload,
    });
}
