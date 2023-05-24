import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IHeaderMenuItemModel {
	id?: number;
	name?: string;
	href?: string;
}

export class HeaderMenuItemModel extends Model<IHeaderMenuItemModel> implements IHeaderMenuItemModel {
    fillable: Array<keyof IHeaderMenuItemModel> = [
		"id",
		"name",
		"href"
    ];

	id = 0;
	name = '';
	href = '';

    constructor(payload?: IHeaderMenuItemModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
			href: observable
        });

        this.update(payload);
    }
}
