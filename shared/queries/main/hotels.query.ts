import { HotelModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    departureCity?: string;
    place?: string;
    date?: string;
    nights?: string;
    adults?: string;
}

type ResponseType = {
    items: HotelModelInterface[],
    pagination: PaginationModelInterface
}

export const hotelsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/hotels',
        params
    });
}
