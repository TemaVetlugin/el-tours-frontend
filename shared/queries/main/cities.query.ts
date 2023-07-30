import { CityModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type ResponseType = {
    items: CityModelInterface[],
}

export const citiesQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/cities',
    });
}
