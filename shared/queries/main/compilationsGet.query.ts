import { CompilationModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    slug: string
};

type ResponseType = {
    item: CompilationModelInterface
}

export const compilationsGetQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/compilations/get',
        params
    });
}
