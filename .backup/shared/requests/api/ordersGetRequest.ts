import { request } from "shared/utilities";
import { IOrderModel } from "shared/models";

type ParamsType = {
    id: number
}

type ResponseType = {
    item: IOrderModel
}

export const ordersGetRequest = async (params?: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/orders/get',
        params,
    });
}
