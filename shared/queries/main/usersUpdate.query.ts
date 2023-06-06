import { UserModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = UserModelInterface;

type ResponseType = {}

export const usersUpdateQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/users/update',
        body
    });
}
