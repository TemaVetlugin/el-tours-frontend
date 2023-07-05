import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { StoreBrandModel, StoreBrandModelInterface } from "./StoreBrand.model";

import { Model } from "./Model";

export interface StoreModelInterface {
    id?: number;
    name?: string;
    address?: string;
    hasDelivery?: boolean;
    schedule?: [number, number, number, number][];
    phone?: string;
    latitude?: number;
    storeBrandId?: number;
    storeBrand?: StoreBrandModelInterface;
    cityId?: number;
    longitude?: number;
    deliveryPrice?: number;
    deliveryFreeFrom?: number;
}

export class StoreModel extends Model<StoreModelInterface> implements StoreModelInterface {
    fillable: Array<keyof StoreModelInterface> = [
        "id",
        "name",
        "address",
        "schedule",
        "hasDelivery",
        "latitude",
        "longitude",
        "storeBrandId",
        "cityId",
        "phone",
        "storeBrand",
        "deliveryPrice",
        "deliveryFreeFrom",
    ];

    casts = {
        storeBrand: new ModelCast(StoreBrandModel)
    }

    id = 0;
    name = '';
    address = '';
    storeBrandId = 0;
    hasDelivery = false;
    cityId = 0;
    phone = '';
    email = '';
    description = '';
    schedule: [number, number, number, number][] = [];
    latitude = 0;
    longitude = 0;
    deliveryPrice = 0;
    deliveryFreeFrom = 0;
    imagesThumbnails: string[] = [];
    storeBrand = new StoreBrandModel();

    constructor(payload?: StoreModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            address: observable,
            phone: observable,
            email: observable,
            description: observable,
            schedule: observable,
            hasDelivery: observable,
            storeBrandId: observable,
            cityId: observable,
            latitude: observable,
            longitude: observable,
            imagesThumbnails: observable,
            deliveryPrice: observable,
            deliveryFreeFrom: observable,
            storeBrand: observable,
            location: computed,
        });

        this.update(payload);
    }

    get location(): [number, number] {
        return [this.latitude, this.longitude];
    }
}
