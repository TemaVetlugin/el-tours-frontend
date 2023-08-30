import { VacancyModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    tagId?: number | null,
    query?: string,
}

type ResponseType = {
    items: VacancyModelInterface[],
    pagination: PaginationModelInterface
}

export const vacancyQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/vacancy',
        params
    });
}
