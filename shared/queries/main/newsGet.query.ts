import { NewsModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    slug?: string,
    cityId?: number,
}

type ResponseType = {
    item: NewsModelInterface,
    other: NewsModelInterface[],
}

export const newsGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/news/get',
        params
    });
}
