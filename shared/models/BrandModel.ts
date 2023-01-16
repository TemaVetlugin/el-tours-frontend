import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IBrandModel {
	id?: number;
	name?: string;
}

export class BrandModel extends Model<IBrandModel> implements IBrandModel {
    fillable: Array<keyof IBrandModel> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: IBrandModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
