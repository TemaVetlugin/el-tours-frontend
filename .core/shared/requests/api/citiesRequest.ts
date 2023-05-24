import { request } from "shared/utilities";
import { ICityModel } from "shared/models";

type ResponseType = {
    items: ICityModel[]
}

export const citiesRequest = async () => {
    return await request.get<ResponseType>({ endpoint: '/cities' });
}
