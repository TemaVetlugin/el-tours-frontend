import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { HeaderMenuTypeEnum } from "shared/enums";

export interface HeaderMenuItemModelInterface {
    id?: number;
    typeId?: string,
    name?: string;
    href?: string;
}

export class HeaderMenuItemModel extends Model<HeaderMenuItemModelInterface> implements HeaderMenuItemModelInterface {
    fillable: Array<keyof HeaderMenuItemModelInterface> = [
        "id",
        "typeId",
        "name",
        "href"
    ];

    id = 0;
    name = '';
    typeId = '';
    href = '';

    constructor(payload?: HeaderMenuItemModelInterface) {
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
        return HeaderMenuTypeEnum.from(this.typeId);
    }
}
