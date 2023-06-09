import { OrderItemModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

export type ParamsType = {
    id?: number | string,
}

type ResponseType = {
    item: OrderItemModelInterface,
}

export const ordersGetQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/orders/get',
        params,
    });
}
