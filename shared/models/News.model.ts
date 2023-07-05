import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface NewsModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
}

export class NewsModel extends Model<NewsModelInterface> implements NewsModelInterface {
    fillable: Array<keyof NewsModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';

    constructor(payload?: NewsModelInterface) {
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
