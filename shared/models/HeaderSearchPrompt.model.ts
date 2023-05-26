import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface HeaderSearchPromptModelInterface {
	id?: number;
	name?: string;
}

export class HeaderSearchPromptModel extends Model<HeaderSearchPromptModelInterface> implements HeaderSearchPromptModelInterface {
    fillable: Array<keyof HeaderSearchPromptModelInterface> = [
		"id",
		"name",
    ];

	id = 0;
	name = '';

    constructor(payload?: HeaderSearchPromptModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
        });

        this.update(payload);
    }
}
