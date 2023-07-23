import { ArticleModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    tagId?: number | null,
    cityId: number
}

type ResponseType = {
    items: ArticleModelInterface[],
    pagination: PaginationModelInterface
}

export const articlesQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/articles',
        params
    });
}