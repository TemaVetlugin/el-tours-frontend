import {
    CatalogCategoryModelInterface,
    CityModelInterface,
    CompilationModelInterface,
    HeaderMenuModelInterface,
    SearchPromptModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

export type ResponseType = {
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
