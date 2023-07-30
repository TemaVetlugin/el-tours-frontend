import { CityModelInterface } from "shared/models";

import { makeQuery } from "../utilities";


type RequestType = {
    latitude: number | string | null,
    longitude: number | string | null,
}

type ResponseType = {
    item: CityModelInterface,
}

export const citiesLocateQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/cities/locate',
        body
    });
}
