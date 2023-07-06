import { DateTime } from "luxon";

export const date = (date: string) => {
    return DateTime.fromISO(date);
}
