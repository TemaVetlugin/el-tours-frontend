import { makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { CatalogProductModel, CatalogProductModelInterface } from "./CatalogProduct.model";
import { Model } from "./Model";
import { OrderItemModel, OrderItemModelInterface } from "shared/models/OrderItem.model";

export interface TagModelInterface {
    id?: number;
    name?: string
}

export class TagModel extends Model<TagModelInterface> implements TagModelInterface {

    fillable: Array<keyof TagModelInterface> = [
        "id",
        "name",
    ];

    id = 0;
    name = '';

    constructor(payload?: TagModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
        });

        this.update(payload);
    }
}
