import { CheckoutItemModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId?: number,
}

type ResponseType = {
    items: CheckoutItemModelInterface[]
}

export const checkoutQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/checkout',
        params
    });
}
