import { request } from "shared/utilities";
import { IStoreBrandModel } from "shared/models";

type ResponseType = {
    items: IStoreBrandModel[]
}
export const storeBrandsRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/store-brands',
    });
}
