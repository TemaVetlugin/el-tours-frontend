import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface RegionModelInterface {
    id?: number;
    name?: string;
    isOpened?: boolean;
}

export class RegionModel extends Model<RegionModelInterface> implements RegionModelInterface {
    fillable: Array<keyof RegionModelInterface> = [
        "id",
        "name",
        "isOpened",
    ];

    id = 0;
    name = 'г. Томск';
    isOpened = false;

    constructor(payload?: RegionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            isOpened: observable,
        });

        this.update(payload);
    }
}
