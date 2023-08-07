import { LicenseSectionModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number
}

type ResponseType = {
    items: LicenseSectionModelInterface[],
}

export const licenseSectionsQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/license-sections',
        params
    });
}
