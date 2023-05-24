import { request } from "shared/utilities";
import { IUserModel } from "shared/models";

type PayloadType = IUserModel;

type ResponseType = {
    item: IUserModel
}

export const usersUpdateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/users/update',
        payload,
    });
}
