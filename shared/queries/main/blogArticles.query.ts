import { NewsModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    tagId?: number | null,
    query?: string,
}

type ResponseType = {
    items: NewsModelInterface[],
    pagination: PaginationModelInterface
}

export const blogArticlesQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/blog-articles',
        params
    });
}
