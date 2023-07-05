import { makeQuery } from "../utilities";

type ResponseType = {}

export const cartItemsClearQuery = async () => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/cart-items/clear',
    });
}
