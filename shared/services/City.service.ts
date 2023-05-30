import { CityModel, CityModelInterface, RegionModel, RegionModelInterface } from "shared/models";
import { makeAutoObservable } from "mobx";

type BootType = {
    cities: CityModelInterface[],
    regions: RegionModelInterface[],
    cityId: number | string | null
}
export const CityService = new class {
    cityId: number | null = null;
    cities: CityModel[] = [];
    regions: RegionModel[] = [];

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

    boot = ({ cities, cityId, regions }: BootType) => {
        this.cities = cities.map(city => new CityModel(city));
        this.regions = regions.map(region => new RegionModel(region));
        if (cityId !== null) {
            this.cityId = +cityId;
        } else {
            this.cityId = cities.find(city => !!city.isDefault)?.id || null;
        }
    }

    set = (cityId: number) => {

    }
}
