import { request } from "shared/utilities";

export const cartItemsClearRequest = async () => {
    return await request.post({
        endpoint: '/cart-items/clear',
    });
}
