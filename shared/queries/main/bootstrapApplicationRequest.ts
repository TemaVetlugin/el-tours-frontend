import { request } from "shared/utilities";
import {
    IContentResourceModel, IFooterMenuItemModel,
    IHeaderMenuItemModel,
    IHeaderSearchPromptModel
} from "shared/models";

type ResponseType = {
    contentResources: IContentResourceModel[],
    headerSearchPrompts: IHeaderSearchPromptModel[],
    headerMenuItems: IHeaderMenuItemModel[],
    footerMenuItems: IFooterMenuItemModel[],
}

export const bootstrapApplicationRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/bootstrap/application',
    });
}
