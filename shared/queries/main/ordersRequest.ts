import { request } from "shared/utilities";
import { IOrderModel } from "shared/models";

type ResponseType = {
    items: IOrderModel[]
}

export const ordersRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/orders',
    });
}
