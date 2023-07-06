import { DateTime } from "luxon";

export const date = (date: string | null = null) => {
    if (!date) {
        return DateTime.now();
    }
    return DateTime.fromISO(date);
}
