import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, ICatalogProductModel } from "shared/models/CatalogProductModel";
import { ModelArrayCast } from "shared/casts";

export interface INewsModel {
    id?: number
    name: string,
    slug?: string,
    content?: string;
    previewImageThumbnail?: string,
    detailImageThumbnail?: string,
    description?: string,
    catalogProducts?: ICatalogProductModel[]
}

export class NewsModel extends Model<INewsModel> implements INewsModel {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof INewsModel> = [
		"id",
		"name",
		"slug",
		"content",
		"previewImageThumbnail",
		"detailImageThumbnail",
        "description",
        "catalogProducts"
    ];

	id = 0;
	name = '';
    slug = '';
	content = '';
	previewImageThumbnail = '';
	detailImageThumbnail = '';
    description = '';
	catalogProducts: CatalogProductModel[] = [];

    constructor(payload?: INewsModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
            slug: observable,
			content: observable,
			previewImageThumbnail: observable,
			detailImageThumbnail: observable,
            description: observable,
            catalogProducts: observable
        });

        this.update(payload);
    }
}
