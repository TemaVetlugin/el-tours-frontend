import { request } from "shared/utilities";
import { ICatalogCategoryModel } from "shared/models";

type ResponseType = {
    items: ICatalogCategoryModel[]
}

export const catalogCategoriesRequest = async () => {
    return await request.get<ResponseType>({ endpoint: '/catalog-categories'});
}
