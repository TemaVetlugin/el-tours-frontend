import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface BlogArticleModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
    preview?: string;
    createdDate?: string;
    readingTime?: string;
    views?: number;
    content?: string;
}

export class BlogArticleModel extends Model<BlogArticleModelInterface> implements BlogArticleModelInterface {

    fillable: Array<keyof BlogArticleModelInterface> = [
        "id",
        "name",
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
    name = '';
    slug = '';
    previewImage = '';
    preview = '';
    createdDate = '';
    readingTime = '';
    views = 0;
    content = '';

    constructor(payload?: BlogArticleModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
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
