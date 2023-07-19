import { TagModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    has?: string[],
}

type ResponseType = {
    items: TagModelInterface[]
}

export const tagsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/tags',
        params
    });
}
