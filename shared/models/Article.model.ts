import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface ArticleModelInterface {
    id?: number;
    width?: number;
    name?: string;
    country?: string;
    slug?: string;
    previewImage?: string;
    preview?: string;
    createdDate?: string;
    readingTime?: string;
    views?: number;
    content?: string;
}

export class ArticleModel extends Model<ArticleModelInterface> implements ArticleModelInterface {

    fillable: Array<keyof ArticleModelInterface> = [
        "id",
        "name",
        "width",
        "country",
        "slug",
        "previewImage",
        "preview",
        "content",
        "createdDate",
        "readingTime",
        "views",
        "content",
    ];

    id = 0;
    width = 0;
    name = '';
    country = '';
    slug = '';
    previewImage = '';
    preview = '';
    createdDate = '';
    readingTime = '';
    views = 0;
    content = '';

    constructor(payload?: ArticleModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            width: observable,
            country: observable,
            slug: observable,
            previewImage: observable,
            preview: observable,
            createdDate: observable,
            readingTime: observable,
            views: observable,
            content: observable,
        });

        this.update(payload);
    }
}
