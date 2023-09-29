import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface HeaderMenuSectionModelInterface {
    id?: number;
    name?: string;
    sort?: number;
}

export class HeaderMenuSectionModel extends Model<HeaderMenuSectionModelInterface> implements HeaderMenuSectionModelInterface {
    fillable: Array<keyof HeaderMenuSectionModelInterface> = [
        "id",
        "name",
        'sort'
    ];

    id = 0;
    name = '';
    sort = 0;


    constructor(payload?: HeaderMenuSectionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            sort: observable,
        });

        this.update(payload);
    }

}
