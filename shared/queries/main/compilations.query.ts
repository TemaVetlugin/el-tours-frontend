import { CompilationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number
};

type ResponseType = {
    items: CompilationModelInterface[]
}

export const compilationsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/compilations',
        params
    });
}
