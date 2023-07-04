import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface HomeBannerModelInterface {
	id?: number;
	name?: string;
	image?: string;
	actionUrl?: string;
	actionLabel?: string;
}

export class HomeBannerModel extends Model<HomeBannerModelInterface> implements HomeBannerModelInterface {
    fillable: Array<keyof HomeBannerModelInterface> = [
		"id",
		"name",
        "image",
        "actionUrl",
        "actionLabel",
    ];

	id = 0;
	name = '';
    image = '';
    actionUrl = '';
    actionLabel = '';

    constructor(payload?: HomeBannerModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            image: observable,
            actionUrl: observable,
            actionLabel: observable,
        });

        this.update(payload);
    }
}
