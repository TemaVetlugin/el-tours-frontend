import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface SearchPromptModelInterface {
	id?: number;
	name?: string;
}

export class SearchPromptModel extends Model<SearchPromptModelInterface> implements SearchPromptModelInterface {
    fillable: Array<keyof SearchPromptModelInterface> = [
		"id",
		"name",
    ];

	id = 0;
	name = '';

    constructor(payload?: SearchPromptModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
        });

        this.update(payload);
    }
}
