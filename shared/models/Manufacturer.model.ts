import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ManufacturerModelInterface {
	id?: number;
	name?: string;
	image?: string;
}

export class ManufacturerModel extends Model<ManufacturerModelInterface> implements ManufacturerModelInterface {
    fillable: Array<keyof ManufacturerModelInterface> = [
		"id",
		"name",
		"image"
    ];

	id = 0;
	name = '';
    image = '';

    constructor(payload?: ManufacturerModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            image: observable
        });

        this.update(payload);
    }
}
