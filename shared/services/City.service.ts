import { CityInterface, CityModel } from "shared/models";

export const CityService = new class {
    cityId: number | null = null;
    city: CityModel = new CityModel();
    cities: CityModel[] = [];

    boot = (cities: CityInterface[], cityId: number | null) => {

    }

    set = (cityId) => {

    }
}
