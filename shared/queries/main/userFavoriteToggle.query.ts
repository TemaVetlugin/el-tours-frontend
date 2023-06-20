import { UserFavoriteModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    catalogProductId: number,
}

type ResponseType = {
    items: UserFavoriteModelInterface[]
}

export const userFavoriteToggleQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-favorite/toggle',
        body
    });
}
