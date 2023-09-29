import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface FooterMenuSectionModelInterface {
    id?: number;
    name?: string;
    sort?: number;
}

export class FooterMenuSectionModel extends Model<FooterMenuSectionModelInterface> implements FooterMenuSectionModelInterface {
    fillable: Array<keyof FooterMenuSectionModelInterface> = [
        "id",
        "name",
        'sort'
    ];

    id = 0;
    name = '';
    sort = 0;


    constructor(payload?: FooterMenuSectionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            sort: observable,
        });

        this.update(payload);
    }

}
