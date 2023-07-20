import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface NewsModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
    preview?: string;
    contentImage?: string;
    content?: string;
    catalogProducts?: CatalogProductModelInterface[]
}

export class NewsModel extends Model<NewsModelInterface> implements NewsModelInterface {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof NewsModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
        "preview",
        "contentImage",
        "content",
        "catalogProducts"
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';
    preview = '';
    contentImage = '';
    content = '';
    catalogProducts: CatalogProductModel[] = [];

    constructor(payload?: NewsModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
            preview: observable,
            contentImage: observable,
            content: observable,
            catalogProducts: observable,
        });

        this.update(payload);
    }
}
