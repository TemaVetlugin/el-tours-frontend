import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface CountryModelInterface {
    id?: number;
    name?: string;
}

export class CountryModel extends Model<CountryModelInterface> implements CountryModelInterface {
    fillable: Array<keyof CountryModelInterface> = [
        "id",
        "name"
    ];

    id = 0;
    name = '';

    constructor(payload?: CountryModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable
        });

        this.update(payload);
    }
}
