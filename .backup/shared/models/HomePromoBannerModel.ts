import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IHomePromoBannerModel {
    id?: number;
    href?: string;
    image?: string;
    imageMD?: string;
    imageSM?: string;
    imageXS?: string;
}

export class HomePromoBannerModel extends Model<IHomePromoBannerModel> implements IHomePromoBannerModel {
    fillable: Array<keyof IHomePromoBannerModel> = [
        "id",
        "href",
        "image",
        "imageMD",
        "imageSM",
        "imageXS",
    ];

    id = 0;
    href = '';
    image = '';
    imageMD = '';
    imageSM = '';
    imageXS = '';

    constructor(payload?: IHomePromoBannerModel) {
        super();

        makeObservable(this, {
            id: observable,
            href: observable,
            image: observable,
            imageMD: observable,
            imageSM: observable,
            imageXS: observable,
        });
        this.update(payload);
    }
}
