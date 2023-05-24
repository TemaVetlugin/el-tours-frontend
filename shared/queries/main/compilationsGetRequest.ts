import { request } from "shared/utilities";
import { ICatalogProductModel, ICompilationModel, IPaginationModel } from "shared/models";

type ParamsType = {
    slug: string
}

type ResponseType = {
    item: ICompilationModel,
    items: ICatalogProductModel[],
    pagination: IPaginationModel
}

export const compilationsGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/compilations/get',
        params,
    });
}
