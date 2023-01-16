import { makeObservable, observable } from "mobx";

import { CatalogProductModel, ICatalogProductModel } from "shared/models/CatalogProductModel";
import { ModelArrayCast } from "shared/casts";

import { Model } from "./Model";

export interface ICompilationModel {
	id?: number;
	name?: string;
    slug?: string;
	imageThumbnail?: string;
	catalogProductsCount?: number;
    catalogProducts?: ICatalogProductModel[]
}

export class CompilationModel extends Model<ICompilationModel> implements ICompilationModel {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof ICompilationModel> = [
		"id",
		"name",
		"slug",
		"imageThumbnail",
		"catalogProducts",
		"catalogProductsCount"
    ];

	id = 0;
	name = '';
    slug = '';
    imageThumbnail = '';
    catalogProducts: CatalogProductModel[] = [];
    catalogProductsCount = 0;

    constructor(payload?: ICompilationModel) {
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
