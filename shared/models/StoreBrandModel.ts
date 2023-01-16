import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IStoreBrandModel {
	id?: number;
	name?: string;
}

export class StoreBrandModel extends Model<IStoreBrandModel> implements IStoreBrandModel {
    fillable: Array<keyof IStoreBrandModel> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: IStoreBrandModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
