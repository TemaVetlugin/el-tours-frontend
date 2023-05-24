import { request } from "shared/utilities";
import { IPaginationModel, IFeedbackModel } from "shared/models";

type ParamsType = {
    page?: number
}

type ResponseType = {
    count: number,
    items: IFeedbackModel[],
    pagination: IPaginationModel
}

export const feedbackRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/feedback',
        params,
    });
}
