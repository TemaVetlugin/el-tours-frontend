import { Cache, Cookie } from "shared/utilities/server";
import { citiesQuery } from "shared/queries/main";

type CityServerType = {
    id: number,
    name: string,
}

export const getCity = async (): Promise<CityServerType> => {
    let defaultCity: CityServerType = {
        id: 0,
        name: 'Не определён'
    };

    let city: CityServerType | undefined = defaultCity;

    const cityId = Cookie.get('cityId');
    const { isSuccess, data } = await Cache.remember('citiesQuery', async () => {
        return await citiesQuery();
    });
    if (!isSuccess || !data || data.items.length === 0) {
        return defaultCity;
    }

    // try to find selected city
    if (cityId !== null) {
        city = data.items.find(item => item.id === +cityId) as CityServerType | undefined;
        if (city) {
            return city;
        }
    }

    // get default city
    if (!cityId) {
        city = data.items.find(item => item.isDefault) as CityServerType | undefined;
        if (city) {
            return city;
        }
    }

    // if default city is not find
    if (!city) {
        city = data.items[0] as CityServerType | undefined;
        if (city) {
            return city;
        }
    }

    return defaultCity;
}
