import {
    CatalogCategoryModelInterface,
    CityModelInterface,
    CompilationModelInterface,
    ContentResourceModelInterface, FooterBannerModel, FooterBannerModelInterface, FooterMenuItemModelInterface,
    HeaderMenuItemModelInterface,
    RegionModelInterface,
    SearchPromptModelInterface
} from "shared/models"

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number,
    isHydrate?: boolean
}

type ResponseType = {
    regions: RegionModelInterface[],
    cities: CityModelInterface[],
    headerMenuItems: HeaderMenuItemModelInterface[],
    footerMenuItems: FooterMenuItemModelInterface[],
    footerBanners: FooterBannerModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[],
    contentResources: ContentResourceModelInterface[],
    catalogCategories: CatalogCategoryModelInterface[]
}

export const bootQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/boot',
        params
    });
}
