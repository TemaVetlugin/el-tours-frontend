import { request } from "shared/utilities";
import { IUserModel } from "shared/models";

type ResponseType = {
    accessToken: string,
    item: IUserModel
}

export const usersLogoutRequest = async () => {
    return await request.post<ResponseType>({
        endpoint: '/users/logout',
    });
}
