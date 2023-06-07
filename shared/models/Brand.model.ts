import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface BrandModelInterface {
	id?: number;
	name?: string;
}

export class BrandModel extends Model<BrandModelInterface> implements BrandModelInterface {
    fillable: Array<keyof BrandModelInterface> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: BrandModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
