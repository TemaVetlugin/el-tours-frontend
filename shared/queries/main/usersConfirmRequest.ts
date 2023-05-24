import { request } from "shared/utilities";
import { IUserModel } from "shared/models";

type PayloadType = {
    phone: string,
    code: string
}

type ResponseType = {
    accessToken: string,
}

export const usersConfirmRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/users/confirm',
        payload,
    });
}
