import { PageModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    url?: string,
}

type ResponseType = {
    item: PageModelInterface,
}

export const pageQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/page',
        params
    });
}
