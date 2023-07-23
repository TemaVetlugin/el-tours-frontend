import { CatalogFilterModelInterface, ContentPageModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

type ParamsType = {
    slug: string
}

type ResponseType = {
    item: ContentPageModelInterface
}

export const contentPageGet = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/content-pages/get',
        params
    });
}
