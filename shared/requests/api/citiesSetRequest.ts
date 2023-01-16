import { request } from "shared/utilities";

type PayloadType = {
    id: number
}

export const citiesSetRequest = async (payload: PayloadType) => {
    return await request.post({
        endpoint: '/cities/set',
        payload,
    });
}
