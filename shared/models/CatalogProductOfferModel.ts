import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { Model } from "./Model";
import { IStoreModel, StoreModel } from "./StoreModel";
import { ICatalogProductModel, CatalogProductModel } from "./CatalogProductModel";
import { COLORS } from "shared/contants";

export interface ICatalogProductOfferModel {
    id?: number;
    price?: number,
    quantity?: number,
    catalogProductId?: number,
    catalogProduct?: ICatalogProductModel,
    storeId?: number,
    store?: IStoreModel,
}

export class CatalogProductOfferModel extends Model<ICatalogProductOfferModel> implements ICatalogProductOfferModel {
    fillable: Array<keyof ICatalogProductOfferModel> = [
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

    constructor(payload?: ICatalogProductOfferModel) {
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
                color: COLORS.PRIMARY_GRADIENT,
                name: 'Много'
            }
        }
        if (this.quantity > 10) {
            return {
                color: COLORS.YELLOW_GRADIENT,
                name: 'Достаточно'
            }
        }
        if (this.quantity > 0) {
            return {
                color: COLORS.SECONDARY_GRADIENT,
                name: 'Мало'
            };
        }
        return {
            color: '#5A5A5A',
            name: 'Отсутствует'
        };
    }
}
