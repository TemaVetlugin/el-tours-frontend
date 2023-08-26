import {BlogArticleModelInterface, NewsModelInterface} from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    slug?: string,
    cityId?: number,
}

type ResponseType = {
    item: BlogArticleModelInterface,
    other: BlogArticleModelInterface[],
}

export const blogArticlesGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/blog-articles/get',
        params
    });
}
