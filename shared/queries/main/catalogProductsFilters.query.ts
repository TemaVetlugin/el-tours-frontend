import { CatalogFilterModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";

type FilterNameType =
    'brand'
    | 'catalog_category'
    | 'dosage'
    | 'id'
    | 'manufacturer'
    | 'mark'
    | 'name_starts_with'
    | 'package_amount'
    | 'query'
    | 'release_form'
    | 'store'
    | 'substance';

type ParamsType = {
    query?: string,
    cityId?: number,
    apply?: (FilterNameType | string) [],
    except?: FilterNameType[],
    catalogCategoryId?: number,
}

type ResponseType = {
    items: CatalogFilterModelInterface[]
}

export const catalogProductsFiltersQuery = async (params: ParamsType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/catalog-products/filters',
        params
    });
}
