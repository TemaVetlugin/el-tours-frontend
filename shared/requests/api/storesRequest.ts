import { request } from "shared/utilities";
import { IStoreModel } from "shared/models";


type ResponseType = {
    items: IStoreModel[]
}

export const storesRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/stores',
    });
}
