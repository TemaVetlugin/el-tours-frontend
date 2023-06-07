import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ManufacturerModelInterface {
	id?: number;
	name?: string;
}

export class ManufacturerModel extends Model<ManufacturerModelInterface> implements ManufacturerModelInterface {
    fillable: Array<keyof ManufacturerModelInterface> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: ManufacturerModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
