import { makeQuery } from "../utilities";

type RequestType = {
    query: string
};

type ResponseType = {
    items: string[]
}

export const userAddressesSearchQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/user-addresses/search',
        params
    });
}
