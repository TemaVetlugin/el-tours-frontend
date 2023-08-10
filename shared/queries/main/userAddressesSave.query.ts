import { UserAddressModelInterface } from "shared/models";
import { makeQuery } from "../utilities";

type ResponseType = {
    item: UserAddressModelInterface,
    items: UserAddressModelInterface[]
}

export const userAddressesSaveQuery = async (body: UserAddressModelInterface) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-addresses/save',
        body
    });
}
