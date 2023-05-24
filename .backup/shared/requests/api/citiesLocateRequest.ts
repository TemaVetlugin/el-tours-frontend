import { request } from "shared/utilities";
import { ICityModel } from "shared/models";

type PayloadType = {
    latitude?: number,
    longitude?: number,
}

type ResponseType = {
    item: ICityModel
}

export const citiesLocateRequest = async (payload: PayloadType) => {
    return await request.post<ResponseType>({
        endpoint: '/cities/locate',
        payload,
    });
}
