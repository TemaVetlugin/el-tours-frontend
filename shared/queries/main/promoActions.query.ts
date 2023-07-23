import { PaginationModelInterface, PromoActionModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    cityId: number
}

type ResponseType = {
    items: PromoActionModelInterface[],
    pagination: PaginationModelInterface
}

export const promoActionsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/promo-actions',
        params
    });
}
