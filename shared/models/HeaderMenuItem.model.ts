import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface HeaderMenuItemModelInterface {
    id?: number;
    headerMenuSectionId?: number;
    sort?: number,
    name?: string;
    href?: string;
}

export class HeaderMenuItemModel extends Model<HeaderMenuItemModelInterface> implements HeaderMenuItemModelInterface {
    fillable: Array<keyof HeaderMenuItemModelInterface> = [
        "id",
        "headerMenuSectionId",
        "sort",
        "name",
        "href"
    ];

    id = 0;
    headerMenuSectionId = 0;
    name = '';
    sort = 0;
    href = '';

    constructor(payload?: HeaderMenuItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            headerMenuSectionId: observable,
            sort: observable,
            name: observable,
            href: observable,
        });

        this.update(payload);
    }

}
