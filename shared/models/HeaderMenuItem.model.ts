import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { HeaderMenuItemTypeEnum } from "shared/enums";

export interface HeaderMenuItemModelInterface {
    id?: number;
    typeId?: string,
    name?: string;
    url?: string;
}

export class HeaderMenuItemModel extends Model<HeaderMenuItemModelInterface> implements HeaderMenuItemModelInterface {
    fillable: Array<keyof HeaderMenuItemModelInterface> = [
        "id",
        "typeId",
        "name",
        "url"
    ];

    id = 0;
    name = '';
    typeId = '';
    url = '';

    constructor(payload?: HeaderMenuItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            typeId: observable,
            name: observable,
            url: observable,
            type: computed
        });

        this.update(payload);
    }

    get type() {
        return HeaderMenuItemTypeEnum.from(this.typeId);
    }
}
