import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface FooterBannerModelInterface {
    id?: number;
    url?: string;
    image?: string;
}

export class FooterBannerModel extends Model<FooterBannerModelInterface> implements FooterBannerModelInterface {
    fillable: Array<keyof FooterBannerModelInterface> = [
        "id",
        "url",
        "image"
    ];

    id = 0;
    url = '';
    image = '';

    constructor(payload?: FooterBannerModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            url: observable,
            image: observable,
        });

        this.update(payload);
    }
}
