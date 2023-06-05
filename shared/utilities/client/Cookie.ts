import cookies from 'js-cookie';

export const Cookie = new class { //} implements CookieType {
    get = (key: string): string | null => {
        return cookies.get(key) || null;
    }

    set = (key: string, value: string | number) => {
        cookies.set(key, value.toString());
    }
}
