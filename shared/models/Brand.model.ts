import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface BrandModelInterface {
	id?: number;
	name?: string;
	image?: string;
	sort?: number;
}

export class BrandModel extends Model<BrandModelInterface> implements BrandModelInterface {
    fillable: Array<keyof BrandModelInterface> = [
		"id",
		"sort",
		"name",
		"image",
    ];

	id = 0;
	sort = 0;
	name = '';
    image = '';

    constructor(payload?: BrandModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			sort: observable,
			name: observable,
            image: observable,
        });

        this.update(payload);
    }
}
