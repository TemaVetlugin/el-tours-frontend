import { request } from "shared/utilities";
import { ICartItemModel, ICatalogCategoryModel, IUserModel } from "shared/models";

type PayloadType = {
    accessToken: string | null,
}

type ResponseType = {
    accessToken: string,
    user: IUserModel,
    cartItems: ICartItemModel[],
    favorite: number[],
    catalogCategories: ICatalogCategoryModel[],
}

export const bootstrapClientRequest = async ({ accessToken }: PayloadType) => {
    return await request.get<ResponseType>({
        endpoint: '/bootstrap/client',
        headers: accessToken ? {
            Authorization: `Bearer ${accessToken}`
        } : {}
    });
}
