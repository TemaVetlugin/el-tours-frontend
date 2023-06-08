import { action, computed, makeObservable, observable } from "mobx";

import { isNumeric } from "shared/utilities";

import { Model } from "./Model";

export interface CatalogFilterModelInterface {
    name?: string;
    label?: string;
    isCollapsable?: boolean;
    isSearchable?: boolean;
    isOpened?: boolean;
    isNumber?: boolean;
    isArray?: boolean;
    type?: string;
    items?: any[];
    value?: any,
}

export class CatalogFilterModel extends Model<CatalogFilterModelInterface> implements CatalogFilterModelInterface {
    fillable: Array<keyof CatalogFilterModelInterface> = [
        "name",
        "label",
        "isCollapsable",
        "isSearchable",
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
    isSearchable = true;
    isArray = false;
    isNumber = false;
    isOpened = false;
    type = '';
    items: any[] = [];
    value = null;

    constructor(payload?: CatalogFilterModelInterface) {
        super();

        makeObservable(this, {
            name: observable,
            label: observable,
            isCollapsable: observable,
            isSearchable: observable,
            isArray: observable,
            isNumber: observable,
            type: observable,
            items: observable,
            value: observable,
            isOpened: observable,
            setValue: action,
            code: computed
        });

        this.update(payload);
    }

    // name without []
    get code() {
        return this.name.replace('[]', '');
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
