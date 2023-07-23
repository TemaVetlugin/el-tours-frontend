import { UserReminderModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    remindAt: string,
    catalogProductId: number
}

type ResponseType = {
}

export const userRemindersSaveQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-reminders/save',
        body
    });
}
