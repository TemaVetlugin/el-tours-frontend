import { request } from "shared/utilities";
import { IPromoActionModel } from "shared/models";


type ResponseType = {
    items: IPromoActionModel[]
}

export const promoActionsRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/promo-actions',
    });
}
