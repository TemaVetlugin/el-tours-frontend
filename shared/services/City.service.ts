import { CityModel, CityModelInterface } from "shared/models";
import { makeAutoObservable } from "mobx";

type BootType = {
    cities: CityModelInterface[],
    cityId: number | string | null
}
export const CityService = new class {
    cityId: number | null = null;
    cities: CityModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get city() {
        if (this.cities.length === 0) {
            return new CityModel();
        }
        if (!this.cityId) {
            return this.cities[0];
        }
        const city = this.cities.find(city => city.id === this.cityId);
        return city || this.cities[0];
    }

    boot = ({ cities, cityId }: BootType) => {
        this.cities = cities.map(city => new CityModel(city));
        if (cityId !== null) {
            this.cityId = +cityId;
        } else {
            this.cityId = cities.find(city => !!city.isDefault)?.id || null;
        }
    }

    set = (cityId: number) => {

    }
}
