import {
    CatalogCategoryModelInterface,
    CityModelInterface,
    CompilationModelInterface,
    ContentResourceModelInterface,
    HeaderMenuModelInterface,
    RegionModelInterface,
    SearchPromptModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number | null
}

export type ResponseType = {
    regions: RegionModelInterface[],
    cities: CityModelInterface[],
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[],
    catalogCategories: CatalogCategoryModelInterface[],
    contentResources: ContentResourceModelInterface[],
}

export const homeQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/home',
        params
    });
}
