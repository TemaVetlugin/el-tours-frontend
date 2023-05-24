import { request } from "shared/utilities";
import { IFaqModel } from "shared/models";

type ResponseType = {
    items: IFaqModel[]
}

export const faqRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/faq',
    });
}
