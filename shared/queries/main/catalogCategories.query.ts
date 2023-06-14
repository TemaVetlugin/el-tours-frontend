import { CatalogCategoryModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

type ResponseType = {
    items: CatalogCategoryModelInterface[],
}

export const catalogCategoriesQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-categories',
    });
}
