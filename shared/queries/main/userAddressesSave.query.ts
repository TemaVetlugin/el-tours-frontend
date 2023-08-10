import { UserAddressModelInterface } from "shared/models";
import { makeQuery } from "../utilities";

type ResponseType = {
    items: any[]
}

export const userAddressesSaveQuery = async (body: UserAddressModelInterface) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-addresses/save',
        body
    });
}
