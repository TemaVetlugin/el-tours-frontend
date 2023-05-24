import { action, makeObservable, observable } from "mobx";

import { isNumeric } from "shared/utilities";

import { Model } from "./Model";

export interface ICatalogFilterModel {
    name?: string;
    label?: string;
    isCollapsable?: boolean;
    isOpened?: boolean;
    isNumber?: boolean;
    isArray?: boolean;
    type?: string;
    items?: any;
    value?: any,
}

export class CatalogFilterModel extends Model<ICatalogFilterModel> implements ICatalogFilterModel {
    fillable: Array<keyof ICatalogFilterModel> = [
        "name",
        "label",
        "isCollapsable",
        "isArray",
        "isNumber",
        "isOpened",
        "type",
        "items",
        "value"
    ];

    name = '';
    label = '';
    isCollapsable = false;
    isArray = false;
    isNumber = false;
    isOpened = false;
    type = '';
    items: any = null;
    value = null;

    constructor(payload?: ICatalogFilterModel) {
        super();

        makeObservable(this, {
            name: observable,
            label: observable,
            isCollapsable: observable,
            isArray: observable,
            isNumber: observable,
            type: observable,
            items: observable,
            value: observable,
            isOpened: observable,
            setValue: action
        });

        this.update(payload);
    }

    setValue = (entry: any) => {
        let value = entry;

        if (this.isArray && !Array.isArray(value)) {
            value = [value];
        }

        if (this.isArray && this.isNumber) {
            value = value.filter((v: any) => isNumeric(v)).map((v: string) => +v);
        }

        this.value = value;
    }
}
