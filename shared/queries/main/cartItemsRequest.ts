import { request } from "shared/utilities";
import { ICartItemModel } from "shared/models";

type ResponseType = {
    items: ICartItemModel
}

export const cartItemsRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/cart-items'
    });
}
