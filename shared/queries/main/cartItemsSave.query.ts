import { CartItemModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    catalogProductId: number,
    quantity: number,
}

type ResponseType = {
    items: CartItemModelInterface[]
}

export const cartItemsSaveQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/cart-items/save',
        body
    });
}
