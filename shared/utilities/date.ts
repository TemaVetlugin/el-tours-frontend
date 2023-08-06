import { DateTime } from "luxon";

export const date = (date: string | null = null) => {
    if (!date) {
        return DateTime.now().setLocale('ru');
    }
    return DateTime.fromISO(date).setLocale('ru');
}
