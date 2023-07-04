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

type ResponseType = {
    regions: RegionModelInterface[],
    cities: CityModelInterface[],
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[],
    contentResources: ContentResourceModelInterface[],
    catalogCategories: CatalogCategoryModelInterface[]
}

export const bootQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/boot',
    });
}
