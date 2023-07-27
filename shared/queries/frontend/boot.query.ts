import {
    CatalogCategoryModelInterface,
    CityModelInterface,
    CompilationModelInterface,
    ContentResourceModelInterface,
    HeaderMenuItemModelInterface,
    RegionModelInterface,
    SearchPromptModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

type ResponseType = {
    regions: RegionModelInterface[],
    cities: CityModelInterface[],
    headerMenuItems: HeaderMenuItemModelInterface[],
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
