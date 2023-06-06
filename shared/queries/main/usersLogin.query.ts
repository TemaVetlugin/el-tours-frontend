import { makeQuery } from "../utilities";

type RequestType = {
    phone: string
}

export const usersLoginQuery = async (body: RequestType) => {
    return await makeQuery("POST", {
        endpoint: '/main/users/login',
        body
    });
}
