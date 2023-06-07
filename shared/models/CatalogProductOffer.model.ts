import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";
import { COLORS } from "shared/contants";

import { StoreModel, StoreModelInterface } from "./Store.model";
import { CatalogProductModel, CatalogProductModelInterface } from "./CatalogProduct.model";
import { Model } from "./Model";

export interface CatalogProductOfferModelInterface {
    id?: number;
    price?: number,
    quantity?: number,
    catalogProductId?: number,
    catalogProduct?: CatalogProductModelInterface,
    storeId?: number,
    store?: StoreModelInterface,
}

export class CatalogProductOfferModel extends Model<CatalogProductOfferModelInterface> implements CatalogProductOfferModelInterface {
    fillable: Array<keyof CatalogProductOfferModelInterface> = [
        "id",
        "price",
        "quantity",
        "catalogProductId",
        "catalogProduct",
        "store",
        "storeId",
    ];

    casts = {
        store: new ModelCast(StoreModel),
        catalogProduct: new ModelCast(CatalogProductModel),
    }

    id = 0;
    price = 0;
    quantity = 0;
    catalogProductId = 0;
    storeId = 0;
    store = new StoreModel();
    catalogProduct = new CatalogProductModel();

    constructor(payload?: CatalogProductOfferModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            price: observable,
            quantity: observable,
            catalogProductId: observable,
            catalogProduct: observable,
            storeId: observable,
            store: observable,
            quantityLabel: computed
        });

        this.update(payload);
    }

    get quantityLabel() {
        if (this.quantity > 30) {
            return {
                color: COLORS.GRAY_PRIMARY,
                name: 'Много'
            }
        }
        if (this.quantity > 10) {
            return {
                color: COLORS.GREEN_PRIMARY,
                name: 'Достаточно'
            }
        }
        if (this.quantity > 0) {
            return {
                color: COLORS.GREEN_SECONDARY,
                name: 'Мало'
            };
        }
        return {
            color: '#5A5A5A',
            name: 'Отсутствует'
        };
    }
}
