import { request } from "shared/utilities";

type PayloadType = {
    id: number
}
export const ordersCancelRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/orders/cancel',
        payload,
    });
}
