import { cookies } from 'next/headers';

export const Cookie = new class { //} implements CookieType {
    get = (key: string): string | null => {
        return cookies().get(key)?.value || null;
    }

    all = () => {
        return cookies().getAll();
    }
}
