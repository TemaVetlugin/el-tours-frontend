import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface CityInterface {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
}

export class CityModel extends Model<CityInterface> implements CityInterface {
    fillable: Array<keyof CityInterface> = [
        "id",
        "name",
        "latitude",
        "longitude",
        "zoom",
    ];

    id = 0;
    name = 'г. Томск';
    latitude = 0;
    longitude = 0;
    zoom = 7;

    constructor(payload?: CityInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
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
