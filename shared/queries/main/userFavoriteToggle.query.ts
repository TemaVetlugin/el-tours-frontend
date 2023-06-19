import { makeQuery } from "../utilities";

type RequestType = {
    storeId: number,
}

type ResponseType = {
    items: any[]
}

export const userFavoriteToggleQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-favorite/toggle',
        body
    });
}
