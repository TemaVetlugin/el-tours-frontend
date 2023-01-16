import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, ICatalogProductModel } from "shared/models/CatalogProductModel";
import { ModelArrayCast } from "shared/casts";

export interface IArticleModel {
	id?: number;
	publishedAt?: string;
	isLarge?: boolean;
	name?: string;
    slug?: string;
	content?: string;
	previewImageThumbnail?: string;
	detailImageThumbnail?: string;
    catalogProducts?: ICatalogProductModel[]
}

export class ArticleModel extends Model<IArticleModel> implements IArticleModel {
    casts = {
        catalogProducts: new ModelArrayCast(CatalogProductModel)
    }
    fillable: Array<keyof IArticleModel> = [
		"id",
		"publishedAt",
		"isLarge",
		"name",
		"slug",
		"content",
		"previewImageThumbnail",
		"detailImageThumbnail",
        "catalogProducts"
    ];

	id = 0;
	publishedAt = '';
	isLarge = false;
	name = '';
    slug = '';
	content = '';
	previewImageThumbnail = '';
	detailImageThumbnail = '';
	catalogProducts: CatalogProductModel[] = [];

    constructor(payload?: IArticleModel) {
        super();

        makeObservable(this, {
			id: observable,
			publishedAt: observable,
			isLarge: observable,
			name: observable,
            slug: observable,
			content: observable,
			previewImageThumbnail: observable,
			detailImageThumbnail: observable,
            catalogProducts: observable
        });

        this.update(payload);
    }
}
