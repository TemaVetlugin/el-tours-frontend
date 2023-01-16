import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IHomeBannerModel {
    id?: number;
    name?: string;
    actionLabel?: string;
    actionUrl?: string;
    badgeLabel?: string;
    backgroundImage?: string;
    image?: string;
}

export class HomeBannerModel extends Model<IHomeBannerModel> implements IHomeBannerModel {
    fillable: Array<keyof IHomeBannerModel> = [
        "id",
        "name",
        "actionLabel",
        "actionUrl",
        "badgeLabel",
        "backgroundImage",
        "image",
    ];

    id = 0;
    name = '';
    actionLabel = '';
    actionUrl = '';
    badgeLabel = '';
    backgroundImage = '';
    image = '';

    constructor(payload?: IHomeBannerModel) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            actionLabel: observable,
            actionUrl: observable,
            badgeLabel: observable,
            backgroundImage: observable,
            image: observable,
        });
        this.update(payload);
    }
}
