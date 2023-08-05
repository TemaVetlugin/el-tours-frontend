import { makeQuery } from "../utilities";

type SearchHint = {
    id: number,
    name: string,
    slug: string,
}

type RequestType = {
    query: string,
    cityId: number,
}

type ResponseType = {
    brands: SearchHint[],
    compilations: SearchHint[],
    catalogProducts: SearchHint[],
    news: SearchHint[],
    articles: SearchHint[],
    total: number
}

export const searchHintsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/search/hints',
        params
    });
}
