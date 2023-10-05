import { HotelModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    departureCity?: string;
    place?: string;
    placeType?: string;
    date?: string;
    nights?: string;
    adults?: string;
    children?: string;
    currency?: string;
}

type ResponseType = {
    items: HotelModelInterface[],
}

export const hotelsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/hotels',
        params
    });
}
