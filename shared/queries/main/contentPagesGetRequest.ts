import { request } from "shared/utilities";
import { IContentPageModel } from "shared/models";

type ParamsType = {
    slug: string
}

type ResponseType = {
    item: IContentPageModel
}

export const contentPagesGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/content-pages/get',
        params,
    });
}
