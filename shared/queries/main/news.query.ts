import { CartItemModelInterface, NewsModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    tagId?: number | null,
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
