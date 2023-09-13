import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface PageModelInterface {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
}

export class PageModel extends Model<PageModelInterface> implements PageModelInterface {

    fillable: Array<keyof PageModelInterface> = [
        "id",
        "title",
        "subtitle",
        "description",
    ];

    id = 0;
    title = '';
    subtitle = '';
    description = '';

    constructor(payload?: PageModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            title: observable,
            subtitle: observable,
            description: observable,
        });

        this.update(payload);
    }
}
