import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface MegaMenuItemModelInterface {
    id?: number;
    megaMenuSectionId?: number;
    sort?: number,
    name?: string;
    href?: string;
}

export class MegaMenuItemModel extends Model<MegaMenuItemModelInterface> implements MegaMenuItemModelInterface {
    fillable: Array<keyof MegaMenuItemModelInterface> = [
        "id",
        "megaMenuSectionId",
        "sort",
        "name",
        "href"
    ];

    id = 0;
    megaMenuSectionId = 0;
    name = '';
    sort = 0;
    href = '';

    constructor(payload?: MegaMenuItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            megaMenuSectionId: observable,
            sort: observable,
            name: observable,
            href: observable,
        });

        this.update(payload);
    }

}
