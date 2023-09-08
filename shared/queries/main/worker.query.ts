import { WorkerModelInterface, PaginationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    page?: number,
    tagId?: number | null,
    query?: string,
}

type ResponseType = {
    items: WorkerModelInterface[],
    pagination: PaginationModelInterface
}

export const workerQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/workers',
        params
    });
}
