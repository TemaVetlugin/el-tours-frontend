import { CityModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number,
    catalogProductId: number
}

type ResponseType = {
    items: CityModelInterface[],
}

export const catalogProductViewSaveQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/catalog-product-view/save',
        body
    });
}
