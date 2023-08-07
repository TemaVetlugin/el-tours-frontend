import { ArticleModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    slug?: string,
    cityId?: number,
}

type ResponseType = {
    item: ArticleModelInterface,
    other: ArticleModelInterface[],
}

export const articlesGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/articles/get',
        params
    });
}
