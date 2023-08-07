import { LicenseSectionModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type ResponseType = {
    items: LicenseSectionModelInterface[],
}

export const licenseSectionsQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/license-sections',
    });
}
