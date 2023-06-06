import { StoreModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number
};

type ResponseType = {
    items: StoreModelInterface[]
}

export const storesQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/stores',
        params
    });
}
