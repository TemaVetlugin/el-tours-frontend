import { CartItemModelInterface, UserModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    accessToken: string | null
}

export type ResponseType = {
    accessToken: string,
    item: UserModelInterface,
    cartItems: CartItemModelInterface[],
}

export const usersBootQuery = async ({ accessToken }: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/users/boot',
        headers: accessToken ? {
            Authorization: `Bearer ${accessToken}`
        } : {}
    });
}
