import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IBrandModel2 {
	id?: number;
	name?: string;
	img?: string;
}

export class BrandModel2 extends Model<IBrandModel2> implements IBrandModel2 {
    fillable: Array<keyof IBrandModel2> = [
		"id",
		"name",
		"img"
    ];

	id = 0;
	name = '';
    img = '';

    constructor(payload?: IBrandModel2) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            img: observable
        });

        this.update(payload);
    }
}
