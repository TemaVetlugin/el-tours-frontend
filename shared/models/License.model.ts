import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface LicenseModelInterface {
	id?: number;
	name?: string;
	file?: string;
	sort?: number;
	media?: string;
}

export class LicenseModel extends Model<LicenseModelInterface> implements LicenseModelInterface {
    fillable: Array<keyof LicenseModelInterface> = [
		"id",
		"name",
		"file",
		"sort",
		"media",
    ];

	id = 0;
	name = '';
	file = '';
	sort = 0;
	media = '';

    constructor(payload?: LicenseModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
			file: observable,
			sort: observable,
			media: observable,
        });

        this.update(payload);
    }
}
