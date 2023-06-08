import { CartItemModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type ResponseType = {
    items: CartItemModelInterface[]
}

export const cartItemsQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/cart-items',
    });
}
