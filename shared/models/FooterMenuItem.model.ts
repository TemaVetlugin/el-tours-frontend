import { computed, makeObservable, observable } from "mobx";
import { FooterMenuItemTypeEnum } from "shared/enums";

import { Model } from "./Model";

export interface FooterMenuItemModelInterface {
    id?: number;
    typeId?: string,
    name?: string;
    url?: string;
}

export class FooterMenuItemModel extends Model<FooterMenuItemModelInterface> implements FooterMenuItemModelInterface {
    fillable: Array<keyof FooterMenuItemModelInterface> = [
        "id",
        "typeId",
        "name",
        "url"
    ];

    id = 0;
    name = '';
    typeId = '';
    url = '';

    constructor(payload?: FooterMenuItemModelInterface) {
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
        return FooterMenuItemTypeEnum.from(this.typeId);
    }
}
