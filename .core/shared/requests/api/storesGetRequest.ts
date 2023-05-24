import { request } from "shared/utilities";
import { StoreModel } from "shared/models";

type ParamsType = {
    id: number
}

type ResponseType = {
    item: StoreModel
}

export const storesGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/stores/get',
        params,
    });
}
