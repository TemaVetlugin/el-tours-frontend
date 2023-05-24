import { request } from "shared/utilities";
import { IArticleModel, IPaginationModel } from "shared/models";

type ParamsType = {
    page?: number
}

type ResponseType = {
    items: IArticleModel[]
    pagination: IPaginationModel
}

export const articlesRequest = async (params?: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/articles',
        params
    });
}
