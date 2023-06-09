import { CartItemModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    storeId: number,
}

type ResponseType = {
    item: {
        id: number
    }
}

export const ordersCreateQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/orders/create',
        body
    });
}
