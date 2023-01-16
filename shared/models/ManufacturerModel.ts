import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IManufacturerModel {
	id?: number;
	name?: string;
}

export class ManufacturerModel extends Model<IManufacturerModel> implements IManufacturerModel {
    fillable: Array<keyof IManufacturerModel> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: IManufacturerModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
