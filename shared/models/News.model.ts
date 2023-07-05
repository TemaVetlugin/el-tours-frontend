import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface NewsModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
    preview?: string;
}

export class NewsModel extends Model<NewsModelInterface> implements NewsModelInterface {
    fillable: Array<keyof NewsModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
        "preview",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';
    preview = '';

    constructor(payload?: NewsModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
            preview: observable,
        });

        this.update(payload);
    }
}
