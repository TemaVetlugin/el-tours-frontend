import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface SubstanceModelInterface {
	id?: number;
	name?: string;
}

export class SubstanceModel extends Model<SubstanceModelInterface> implements SubstanceModelInterface {
    fillable: Array<keyof SubstanceModelInterface> = [
		"id",
		"name"
    ];

	id = 0;
	name = '';

    constructor(payload?: SubstanceModelInterface) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable
        });

        this.update(payload);
    }
}
