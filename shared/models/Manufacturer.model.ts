import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ManufacturerModelInterface {
	id?: number;
	name?: string;
	image?: string;
	sort?: number;
}

export class ManufacturerModel extends Model<ManufacturerModelInterface> implements ManufacturerModelInterface {
    fillable: Array<keyof ManufacturerModelInterface> = [
		"id",
		"name",
		"image",
        "sort"
    ];

	id = 0;
	sort = 0;
	name = '';
    image = '';

    constructor(payload?: ManufacturerModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			sort: observable,
			name: observable,
            image: observable
        });

        this.update(payload);
    }
}
