import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface PromoActionModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
    contentImage?: string;
    dateTo?: string;
    content?: string;
    catalogProducts?: CatalogProductModelInterface[]
}

export class PromoActionModel extends Model<PromoActionModelInterface> implements PromoActionModelInterface {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof PromoActionModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
        "contentImage",
        "content",
        "dateTo",
        "catalogProducts",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';
    contentImage = '';
    content = '';
    dateTo = '';
    catalogProducts: CatalogProductModel[] = [];

    constructor(payload?: PromoActionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
            content: observable,
            dateTo: observable,
            catalogProducts: observable,
            contentImage: observable,
        });

        this.update(payload);
    }
}
