import {
    CatalogCategoryModelInterface,
    CityModelInterface,
    CompilationModelInterface,
    HeaderMenuModelInterface,
    RegionModelInterface,
    SearchPromptModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

export type ResponseType = {
    regions: RegionModelInterface[],
    cities: CityModelInterface[],
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[],
    catalogCategories: CatalogCategoryModelInterface[]
}

export const bootQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/boot',
    });
}
