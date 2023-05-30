import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface RegionModelInterface {
    id?: number;
    name?: string;
}

export class RegionModel extends Model<RegionModelInterface> implements RegionModelInterface {
    fillable: Array<keyof RegionModelInterface> = [
        "id",
        "name",
    ];

    id = 0;
    name = 'г. Томск';

    constructor(payload?: RegionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
        });

        this.update(payload);
    }
}
