import { OrderItemModelInterface } from "shared/models";
import { makeQuery } from "shared/queries/utilities";


type ResponseType = {
    items: OrderItemModelInterface[],
}

export const ordersQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/orders',
    });
}
