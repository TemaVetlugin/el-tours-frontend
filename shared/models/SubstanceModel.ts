import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ISubstanceModel {
	id?: number;
	name?: string;
}

export class SubstanceModel extends Model<ISubstanceModel> implements ISubstanceModel {
    fillable: Array<keyof ISubstanceModel> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: ISubstanceModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
