import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductOfferModel, ICatalogProductOfferModel } from "shared/models/CatalogProductOfferModel";
import { ModelArrayCast, ModelCast } from "shared/casts";
import { IStoreBrandModel, StoreBrandModel } from "shared/models/StoreBrandModel";

export interface IStoreModel {
    id?: number;
    name?: string;
    address?: string;
    worktime?: string;
    phone?: string;
    email?: string;
    description?: string;
    imagesThumbnails?: string[];
    latitude?: number;
    storeBrandId?: number;
    storeBrand?: IStoreBrandModel;
    cityId?: number;
    longitude?: number;
    catalogProductOffers?: ICatalogProductOfferModel[]
}

export class StoreModel extends Model<IStoreModel> implements IStoreModel {
    fillable: Array<keyof IStoreModel> = [
        "id",
        "name",
        "address",
        "worktime",
        "latitude",
        "longitude",
        "storeBrandId",
        "cityId",
        "imagesThumbnails",
        "catalogProductOffers",
        "phone",
        "email",
        "description",
        "storeBrand",
    ];

    casts = {
        catalogProductOffers: new ModelArrayCast(CatalogProductOfferModel),
        storeBrand: new ModelCast(StoreBrandModel)
    }

    id = 0;
    name = '';
    address = '';
    storeBrandId = 0;
    cityId = 0;
    phone = '';
    email = '';
    description = '';
    worktime = '';
    latitude = 0;
    longitude = 0;
    catalogProductOffers: CatalogProductOfferModel[] = [];
    imagesThumbnails: string[] = [];
    storeBrand = new StoreBrandModel();

    constructor(payload?: IStoreModel) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            address: observable,
            phone: observable,
            email: observable,
            description: observable,
            worktime: observable,
            storeBrandId: observable,
            cityId: observable,
            latitude: observable,
            longitude: observable,
            imagesThumbnails: observable,
            storeBrand: observable,
            catalogProductOffers: observable,
        });

        this.update(payload);
    }
}
