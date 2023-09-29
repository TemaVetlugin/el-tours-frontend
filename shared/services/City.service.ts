import { makeAutoObservable } from "mobx";

import { CityModel } from "shared/models";
import { bootQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { lodash } from "shared/utilities";
import { Cookie } from "shared/utilities/client";

import { makeService } from "./utilities/makeService";

export const CityService = makeService(class {
    cityId: number | null = null;
    cities: CityModel[] = [];
    // regions: RegionModel[]|undefined = [];

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

    boot = (data: ReturnType<typeof bootQuery>['data'] & { cityId: number }) => {
        // if (data?.cities) {
        //     this.cities = data.cities.map(city => new CityModel(city));
        // }
        // if (data?.regions) {
        //     this.regions = data.regions.map(region => new RegionModel(region));
        // }
        if (data?.cityId) {
            this.cityId = +data.cityId;
        }
        if (!this.cityId) {
            this.cityId = this.cities.find(city => !!city.isDefault)?.id || null;
        }
        if (!this.cityId) {
            this.cityId = this.cities[0]?.id || null;
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


