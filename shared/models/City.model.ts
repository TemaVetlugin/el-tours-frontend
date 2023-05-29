import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface CityModelInterface {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: number,
    zoom?: number;
}

export class CityModel extends Model<CityModelInterface> implements CityModelInterface {
    fillable: Array<keyof CityModelInterface> = [
        "id",
        "name",
        "latitude",
        "longitude",
        "isDefault",
        "zoom",
    ];

    id = 0;
    isDefault = 0;
    name = 'г. Томск';
    latitude = 0;
    longitude = 0;
    zoom = 7;

    constructor(payload?: CityModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            isDefault: observable,
            latitude: observable,
            longitude: observable,
            zoom: observable,
            location: computed
        });

        this.update(payload);
    }

    get location() {
        return [this.latitude, this.longitude];
    }
}
