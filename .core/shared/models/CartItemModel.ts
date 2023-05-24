import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { CatalogProductModel, ICatalogProductModel } from "./CatalogProductModel";
import { Model } from "./Model";

export interface ICartItemModel {
    id?: number;
    isActive?: number;
    catalogProductId?: number;
    quantity?: number | null;
    catalogProduct?: ICatalogProductModel;
}

export class CartItemModel extends Model<ICartItemModel> implements ICartItemModel {
    casts = {
        catalogProduct: new ModelCast(CatalogProductModel)
    };

    fillable: Array<keyof ICartItemModel> = [
        "id",
        "isActive",
        "catalogProductId",
        "quantity",
        "catalogProduct",
    ];

    id = 0;
    isActive = 1;
    catalogProductId = 0;
    quantity = 0;
    catalogProduct = new CatalogProductModel();

    constructor(payload?: ICartItemModel) {
        super();

        makeObservable(this, {
            id: observable,
            isActive: observable,
            quantity: observable,
            catalogProductId: observable,
            catalogProduct: observable,
            totalFrom: computed,
        });

        this.update(payload);
    }

    get totalFrom() {
        if (!this.catalogProduct.priceFrom) {
            return null;
        }
        return this.catalogProduct.priceFrom * this.quantity;
    }
}
