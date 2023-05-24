import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IHeaderSearchPromptModel {
	id?: number;
	name?: string;
}

export class HeaderSearchPromptModel extends Model<IHeaderSearchPromptModel> implements IHeaderSearchPromptModel {
    fillable: Array<keyof IHeaderSearchPromptModel> = [
		"id",
		"name",
    ];

	id = 0;
	name = '';

    constructor(payload?: IHeaderSearchPromptModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
        });

        this.update(payload);
    }
}
