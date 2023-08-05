import { makeQuery } from "../utilities";

type RequestType = {
    query: string
}

type ResponseType = {
    catalogProducts: number,
    news: number,
    articles: number,
    compilations: number,
    total: number
}

export const searchCountsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/search/counts',
        params
    });
}
