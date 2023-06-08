import { makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { CatalogProductModel, CatalogProductModelInterface } from "./CatalogProduct.model";
import { Model } from "./Model";

export interface CartItemModelInterface {
    id?: number;
    catalogProductId?: number;
    quantity?: number | null;
    catalogProduct?: CatalogProductModelInterface;
}

export class CartItemModel extends Model<CartItemModelInterface> implements CartItemModelInterface {
    casts = {
        catalogProduct: new ModelCast(CatalogProductModel)
    };

    fillable: Array<keyof CartItemModelInterface> = [
        "id",
        "catalogProductId",
        "quantity",
        "catalogProduct",
    ];

    id = 0;
    catalogProductId = 0;
    quantity = 0;
    catalogProduct = new CatalogProductModel();

    constructor(payload?: CartItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            quantity: observable,
            catalogProductId: observable,
            catalogProduct: observable,
        });

        this.update(payload);
    }
}
