import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IFooterMenuItemModel {
	id?: number;
	sort?: string;
	name?: string;
	href?: string;
	items?: {
        name?: string,
        href?: string
    }[];
}

export class FooterMenuItemModel extends Model<IFooterMenuItemModel> implements IFooterMenuItemModel {
    fillable: Array<keyof IFooterMenuItemModel> = [
		"id",
		"sort",
		"href",
		"name",
		"items"
    ];

	id = 0;
	sort = '';
	href = '';
	name = '';
	items: IFooterMenuItemModel['items'] = [];

    constructor(payload?: IFooterMenuItemModel) {
        super();

        makeObservable(this, {
			id: observable,
			sort: observable,
			href: observable,
			name: observable,
			items: observable
        });

        this.update(payload);
    }
}
