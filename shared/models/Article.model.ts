import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface ArticleModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
    contentImage?: string;
    content?: string;
    catalogProducts?: CatalogProductModelInterface[]
}

export class ArticleModel extends Model<ArticleModelInterface> implements ArticleModelInterface {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof ArticleModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
        "contentImage",
        "content",
        "catalogProducts",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';
    contentImage = '';
    content = '';
    catalogProducts: CatalogProductModel[] = [];

    constructor(payload?: ArticleModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
            contentImage: observable,
            content: observable,
            catalogProducts: observable,
        });

        this.update(payload);
    }
}
