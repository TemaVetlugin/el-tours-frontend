import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface PromoActionModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
}

export class PromoActionModel extends Model<PromoActionModelInterface> implements PromoActionModelInterface {
    fillable: Array<keyof PromoActionModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';

    constructor(payload?: PromoActionModelInterface) {
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
