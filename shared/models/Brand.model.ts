import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface BrandModelInterface {
	id?: number;
	name?: string;
	image?: string;
}

export class BrandModel extends Model<BrandModelInterface> implements BrandModelInterface {
    fillable: Array<keyof BrandModelInterface> = [
		"id",
		"name",
		"image",
    ];

	id = 0;
	name = '';
    image = '';

    constructor(payload?: BrandModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            image: observable,
        });

        this.update(payload);
    }
}
