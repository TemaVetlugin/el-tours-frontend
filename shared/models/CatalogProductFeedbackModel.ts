import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ICatalogProductFeedbackModel {
	name?: string;
	phone?: string;
	email?: string;
	catalogProductId?: number;
	content?: string;
}

export class CatalogProductFeedbackModel extends Model<ICatalogProductFeedbackModel> implements ICatalogProductFeedbackModel {
    fillable: Array<keyof ICatalogProductFeedbackModel> = [
		"name",
		"phone",
		"email",
		"catalogProductId",
		"content"
    ];

	name = '';
	phone = '';
	email = '';
	catalogProductId = 0;
	content = '';

    constructor(payload?: ICatalogProductFeedbackModel) {
        super();

        makeObservable(this, {
			name: observable,
			phone: observable,
			email: observable,
			catalogProductId: observable,
			content: observable
        });

        this.update(payload);
    }
}
