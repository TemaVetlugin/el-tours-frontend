import { makeObservable, observable } from "mobx";

import { ModelArrayCast } from "shared/casts";

import { Model } from "./Model";

export interface CompilationModelInterface {
	id?: number;
	name?: string;
    slug?: string;
	imageThumbnail?: string;
	catalogProductsCount?: number;
}

export class CompilationModel extends Model<CompilationModelInterface> implements CompilationModelInterface {
    casts = {
    }
    fillable: Array<keyof CompilationModelInterface> = [
		"id",
		"name",
		"slug",
		"imageThumbnail",
		"catalogProductsCount"
    ];

	id = 0;
	name = '';
    slug = '';
    imageThumbnail = '';
    catalogProductsCount = 0;

    constructor(payload?: CompilationModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            slug: observable,
            imageThumbnail: observable,
            catalogProducts: observable,
            catalogProductsCount: observable
        });

        this.update(payload);
    }
}
