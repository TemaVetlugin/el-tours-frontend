import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IBadgeModel {
	id?: number;
	name?: string;
	color?: string;
}

export class BadgeModel extends Model<IBadgeModel> implements IBadgeModel {
    fillable: Array<keyof IBadgeModel> = [
		"id",
		"name",
		"color",
    ];

	id = 0;
	name = '';
    color = '';

    constructor(payload?: IBadgeModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            color: observable
        });

        this.update(payload);
    }
}
