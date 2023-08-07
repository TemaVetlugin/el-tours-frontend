import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface FooterBannerModelInterface {
    id?: number;
    url?: string;
    href?: string;
    image?: string;
}

export class FooterBannerModel extends Model<FooterBannerModelInterface> implements FooterBannerModelInterface {
    fillable: Array<keyof FooterBannerModelInterface> = [
        "id",
        "url",
        "href",
        "image"
    ];

    id = 0;
    url = '';
    href = '';
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
