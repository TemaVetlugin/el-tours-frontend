import {
    FooterMenuItemModelInterface,
    HeaderMenuItemModelInterface,
    HeaderMenuSectionModelInterface,
    SearchPromptModelInterface,
} from "shared/models"

import { makeQuery } from "../utilities";
import {FooterMenuSectionModelInterface} from "shared/models/FooterMenuSection.model";
import {MegaMenuItemModelInterface} from "shared/models/MegaMenuItem.model";
import {MegaMenuSectionModelInterface} from "shared/models/MegaMenuSection.model";

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
    footerMenuSections?: FooterMenuSectionModelInterface[],
    megaMenuItems?: MegaMenuItemModelInterface[],
    megaMenuSections?: MegaMenuSectionModelInterface[],
    searchPrompts?: SearchPromptModelInterface[],
}

export const bootQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/frontend/boot',
    });
}


