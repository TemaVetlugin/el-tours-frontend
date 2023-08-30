import {VacancyModelInterface} from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    slug?: string,
    cityId?: number,
}

type ResponseType = {
    item: VacancyModelInterface,
    other: VacancyModelInterface[],
}

export const vacancyGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/vacancy/get',
        params
    });
}
