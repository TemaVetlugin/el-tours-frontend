import {
    FooterMenuItemModelInterface,
    HeaderMenuItemModelInterface,
    HeaderMenuSectionModelInterface,
    SearchPromptModelInterface,
} from "shared/models"

import { makeQuery } from "../utilities";

// type RequestType = {
//     cityId: number,
//     isHydrate?: boolean
// }

type ResponseType = {
    // regions?: RegionModelInterface[],
    // cities?: CityModelInterface[],
    headerMenuItems?: HeaderMenuItemModelInterface[],
    headerMenuSections?: HeaderMenuSectionModelInterface[],
    footerMenuItems?: FooterMenuItemModelInterface[],
    footerMenuSections?: HeaderMenuSectionModelInterface[],
    searchPrompts?: SearchPromptModelInterface[],
}

export const bootQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/boot',
    });
}


