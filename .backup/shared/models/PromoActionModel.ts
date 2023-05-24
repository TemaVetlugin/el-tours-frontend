import { makeObservable, observable } from "mobx";

import { ModelArrayCast } from "shared/casts";

import { Model } from "./Model";
import { CatalogProductModel, ICatalogProductModel } from "shared/models/CatalogProductModel";

export interface IPromoActionModel {
    id?: number;
    name?: string;
    slug?: string;
    dateFrom?: string;
    dateTo?: string;
    catalogProducts?: ICatalogProductModel[];
    previewText?: string;
    detailText?: string;
    previewImageThumbnail?: string;
    detailImageThumbnail?: string;
}

export class PromoActionModel extends Model<IPromoActionModel> implements IPromoActionModel {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof IPromoActionModel> = [
        "id",
        "name",
        "slug",
        "dateFrom",
        "dateTo",
        "catalogProducts",
        "previewText",
        "detailText",
        "previewImageThumbnail",
        "detailImageThumbnail"
    ];

    id = 0;
    name = '';
    slug = '';
    dateFrom = '';
    dateTo = '';
    catalogProducts: CatalogProductModel[] = [];
    previewText = '';
    detailText = '';
    previewImageThumbnail = '';
    detailImageThumbnail = '';

    constructor(payload?: IPromoActionModel) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            dateFrom: observable,
            dateTo: observable,
            catalogProducts: observable,
            previewText: observable,
            detailText: observable,
            previewImageThumbnail: observable,
            detailImageThumbnail: observable
        });

        this.update(payload);
    }
}
