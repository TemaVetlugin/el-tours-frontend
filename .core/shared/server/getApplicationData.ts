import { bootstrapApplicationRequest } from "shared/requests/api";
import { ApplicationDataType } from "shared/types";

import { Redis } from "./Redis";

export const getApplicationData = async (force = false): Promise<ApplicationDataType> => {
    const { data, isSuccess } = await Redis.cache('bootstrapApplicationRequest', async () => await bootstrapApplicationRequest(), 36000, force);
    if (isSuccess && data) {
        return data;
    }
    return {
        contentResources: [],
        headerMenuItems: [],
        headerSearchPrompts: [],
        footerMenuItems: []
    };
}
