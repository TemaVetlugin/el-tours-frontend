import { BrandModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    id?: number,
}

type ResponseType = {
    item: BrandModelInterface,
}

export const brandsGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/brands/get',
        params
    });
}
