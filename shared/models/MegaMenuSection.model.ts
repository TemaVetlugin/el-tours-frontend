import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface MegaMenuSectionModelInterface {
    id?: number;
    name?: string;
    sort?: number;
}

export class MegaMenuSectionModel extends Model<MegaMenuSectionModelInterface> implements MegaMenuSectionModelInterface {
    fillable: Array<keyof MegaMenuSectionModelInterface> = [
        "id",
        "name",
        'sort'
    ];

    id = 0;
    name = '';
    sort = 0;


    constructor(payload?: MegaMenuSectionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            sort: observable,
        });

        this.update(payload);
    }

}
