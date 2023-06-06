import { makeQuery } from "../utilities";

type RequestType = {
    phone: string,
    code: string,
}

type ResponseType = {
    accessToken: string
}

export const usersConfirmQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/users/confirm',
        body
    });
}
