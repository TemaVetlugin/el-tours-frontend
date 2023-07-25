import { SubstanceModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    id?: number,
}

type ResponseType = {
    item: SubstanceModelInterface,
}

export const substancesGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/substances/get',
        params
    });
}
