import { makeAutoObservable } from "mobx";

import { CityModel, CityModelInterface, RegionModel, RegionModelInterface } from "shared/models";

import { makeService } from "./utilities/makeService";
import { lodash } from "shared/utilities";
import { Cookie } from "shared/utilities/client";
import { usersUpdateQuery } from "shared/queries/main";

type BootType = {
    cities: CityModelInterface[],
    regions: RegionModelInterface[],
    cityId: number | string | null
}
export const LocationService = makeService(class {
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

    get citiesByRegionId() {
        return lodash.groupBy(this.cities, 'regionId');
    }

    setCity = (cityId: number, withUpdate = false) => {
        Cookie.set('cityId', cityId);
        this.cityId = cityId;
    }
});
