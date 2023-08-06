import { computed, makeObservable, observable } from "mobx";
import { FooterMenuItemTypeEnum } from "shared/enums";

import { Model } from "./Model";

export interface FooterMenuItemModelInterface {
    id?: number;
    typeId?: string,
    name?: string;
    href?: string;
}

export class FooterMenuItemModel extends Model<FooterMenuItemModelInterface> implements FooterMenuItemModelInterface {
    fillable: Array<keyof FooterMenuItemModelInterface> = [
        "id",
        "typeId",
        "name",
        "href"
    ];

    id = 0;
    name = '';
    typeId = '';
    href = '';

    constructor(payload?: FooterMenuItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            typeId: observable,
            name: observable,
            href: observable,
            type: computed
        });

        this.update(payload);
    }

    get type() {
        return FooterMenuItemTypeEnum.from(this.typeId);
    }
}
