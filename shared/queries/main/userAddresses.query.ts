import { UserAddressModelInterface } from "shared/models";
import { makeQuery } from "../utilities";

type ResponseType = {
    items: UserAddressModelInterface[]
}

export const userAddressesQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/user-addresses',
    });
}
