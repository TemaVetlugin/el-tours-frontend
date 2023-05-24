import { request } from "shared/utilities";
import { IPromoActionModel } from "shared/models";

type ParamsType = {
    slug: string
}

type ResponseType = {
    item: IPromoActionModel
}

export const promoActionsGetRequest = async (params: ParamsType) => {
    return await request.get<ResponseType>({
        endpoint: '/promo-actions/get',
        params,
    });
}
