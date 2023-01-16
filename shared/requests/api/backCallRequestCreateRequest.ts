import { request } from "shared/utilities";

type PayloadType = {
    name: string,
    phone: string
}

type ResponseType = {
}

export const backCallRequestCreateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/back-call-request/create',
        payload,
    });
}
