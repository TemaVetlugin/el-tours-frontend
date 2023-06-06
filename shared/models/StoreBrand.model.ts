import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface StoreBrandModelInterface {
	id?: number;
	name?: string;
}

export class StoreBrandModel extends Model<StoreBrandModelInterface> implements StoreBrandModelInterface {
    fillable: Array<keyof StoreBrandModelInterface> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: StoreBrandModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
