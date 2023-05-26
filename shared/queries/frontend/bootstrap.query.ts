import { defineQuery } from "shared/queries/utilities";
import { CityInterface, HeaderMenuModelInterface, } from "shared/models";

type ResponseType = {
    cities: CityInterface[],
    headerMenu: HeaderMenuModelInterface[]
}

export const bootstrapQuery = async () => {
    return await defineQuery<ResponseType>("GET", {
        endpoint: '/frontend/bootstrap',
    });
}
