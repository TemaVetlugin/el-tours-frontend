import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IHomeWhyTrustModel {
	id?: number;
	name?: string;
	sort?: number;
	description?: string;
	imageThumbnail?: string;
}

export class HomeWhyTrustModel extends Model<IHomeWhyTrustModel> implements IHomeWhyTrustModel {
    fillable: Array<keyof IHomeWhyTrustModel> = [
		"id",
		"name",
		"sort",
		"description",
		"imageThumbnail"
    ];

	id = 0;
	name = '';
	sort = 0;
	description = '';
	imageThumbnail = '';

    constructor(payload?: IHomeWhyTrustModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
			sort: observable,
			description: observable,
			imageThumbnail: observable
        });

        this.update(payload);
    }
}
