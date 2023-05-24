import { query } from "shared/queries/utilities";
import {
    CityInterface,
    IContentResourceModel, IFooterMenuItemModel,
    IHeaderMenuItemModel,
    IHeaderSearchPromptModel
} from "shared/models";

type ResponseType = {
    contentResources: IContentResourceModel[],
    cities: CityInterface[],
    headerSearchPrompts: IHeaderSearchPromptModel[],
    headerMenuItems: IHeaderMenuItemModel[],
    footerMenuItems: IFooterMenuItemModel[],
}

export const bootstrapQuery = async () => {
    return await query.get<ResponseType>({
        endpoint: '/frontend/bootstrap',
    });
}
