import { makeObservable, observable } from "mobx";

import { ModelArrayCast } from "shared/casts";

import { Model } from "./Model";
import { CatalogProductModel, ICatalogProductModel } from "shared/models/CatalogProductModel";

export interface IPromoActionModel2 {
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
    badge?: string;
}

export class PromoActionModel2 extends Model<IPromoActionModel2> implements IPromoActionModel2 {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof IPromoActionModel2> = [
        "id",
        "name",
        "slug",
        "dateFrom",
        "dateTo",
        "catalogProducts",
        "previewText",
        "detailText",
        "previewImageThumbnail",
        "detailImageThumbnail",
        "badge"
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
    badge = '';

    constructor(payload?: IPromoActionModel2) {
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
            detailImageThumbnail: observable,
            badge: observable
        });

        this.update(payload);
    }
}
