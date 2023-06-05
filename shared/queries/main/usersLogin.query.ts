import { makeQuery } from "../utilities";

type RequestType = {
    phone: string
}

export const usersLogin = async (body: RequestType) => {
    return await makeQuery("POST", {
        endpoint: '/main/users/login',
        body
    });
}
