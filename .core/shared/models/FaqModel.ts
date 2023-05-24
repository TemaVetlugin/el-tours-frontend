import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IFaqModel {
	id?: number;
	name?: string;
	description?: string;
}

export class FaqModel extends Model<IFaqModel> implements IFaqModel {
    fillable: Array<keyof IFaqModel> = [
		"id",
		"name",
		"description"
    ];

	id = 0;
	name = '';
	description = '';

    constructor(payload?: IFaqModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
			description: observable
        });

        this.update(payload);
    }
}
