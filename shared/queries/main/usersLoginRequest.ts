import { request } from "shared/utilities";

type PayloadType = {
    phone: string,
}

export const usersLoginRequest = async (payload: PayloadType) => {
    return await request.post({
        endpoint: '/users/login',
        payload,
    });
}
