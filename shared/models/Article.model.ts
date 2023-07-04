import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ArticleModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
}

export class ArticleModel extends Model<ArticleModelInterface> implements ArticleModelInterface {
    fillable: Array<keyof ArticleModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';

    constructor(payload?: ArticleModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
        });

        this.update(payload);
    }
}
