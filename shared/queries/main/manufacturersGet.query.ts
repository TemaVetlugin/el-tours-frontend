import { ManufacturerModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    id?: number,
}

type ResponseType = {
    item: ManufacturerModelInterface,
}

export const manufacturersGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/manufacturers/get',
        params
    });
}
