import { request } from "shared/utilities";
import { IArticleModel } from "shared/models";

type ParamsType = {
    slug: number | string
}

type ResponseType = {
    item: IArticleModel
    items: IArticleModel[]
}

export const articlesGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/articles/get',
        params,
    });
}
