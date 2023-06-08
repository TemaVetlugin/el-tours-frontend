import { CartItemModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId?: number | null,
}

type ResponseType = {
    items: CartItemModelInterface[]
}

export const cartItemsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/cart-items',
        params
    });
}
