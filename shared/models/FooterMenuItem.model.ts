import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface FooterMenuItemModelInterface {
    id?: number;
    footerMenuSectionId?: number;
    sort?: number,
    name?: string;
    href?: string;
}

export class FooterMenuItemModel extends Model<FooterMenuItemModelInterface> implements FooterMenuItemModelInterface {
    fillable: Array<keyof FooterMenuItemModelInterface> = [
        "id",
        "footerMenuSectionId",
        "sort",
        "name",
        "href"
    ];

    id = 0;
    footerMenuSectionId = 0;
    name = '';
    sort = 0;
    href = '';

    constructor(payload?: FooterMenuItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            footerMenuSectionId: observable,
            sort: observable,
            name: observable,
            href: observable,
        });

        this.update(payload);
    }

}
