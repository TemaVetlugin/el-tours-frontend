import { UserReminderModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    cityId: number
}

type ResponseType = {
    items: UserReminderModelInterface[],
}

export const userRemindersQuery = async (params: RequestType) => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/main/user-reminders',
        params
    });
}
