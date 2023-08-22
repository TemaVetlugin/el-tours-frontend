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
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';
    preview = '';
    content = '';

    constructor(payload?: BlogArticleModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
            preview: observable,
            content: observable,
        });

        this.update(payload);
    }
}
