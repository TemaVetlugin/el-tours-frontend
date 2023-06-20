import { UserStoreModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    storeId: number,
}

type ResponseType = {
    items: UserStoreModelInterface[]
}

export const userStoresToggleQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-stores/toggle',
        body
    });
}
