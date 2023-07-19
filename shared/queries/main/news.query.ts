import { CartItemModelInterface, NewsModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    cityId: number
}

type ResponseType = {
    items: NewsModelInterface[],
    pagination: PaginationModelInterface
}

export const newsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/news',
        params
    });
}
