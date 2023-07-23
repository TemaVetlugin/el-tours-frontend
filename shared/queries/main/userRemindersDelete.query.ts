import { UserReminderModelInterface } from "shared/models";

import { makeQuery } from "../utilities";

type RequestType = {
    id: number,
}

type ResponseType = {
}

export const userRemindersDeleteQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/main/user-reminders/delete',
        body
    });
}
