import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface HeaderMenuModelInterface {
	id?: number;
    typeId?: string,
	name?: string;
	href?: string;
}

export class HeaderMenuModel extends Model<HeaderMenuModelInterface> implements HeaderMenuModelInterface {
    fillable: Array<keyof HeaderMenuModelInterface> = [
		"id",
		"typeId",
		"name",
		"href"
    ];

	id = 0;
	name = '';
    typeId = '';
	href = '';

    constructor(payload?: HeaderMenuModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
            typeId: observable,
			name: observable,
			href: observable
        });

        this.update(payload);
    }
}
