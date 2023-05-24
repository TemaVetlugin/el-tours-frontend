import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { ICatalogProductModel, CatalogProductModel } from "./CatalogProductModel";
import { Model } from "./Model";

export interface IOrderItemModel {
    id: number;
    orderId: number;
    name: string;
    quantity: number;
    price: number;
    catalogProduct: ICatalogProductModel;
    catalogProductId: number;
}

export class OrderItemModel extends Model<IOrderItemModel> implements IOrderItemModel {
    fillable: Array<keyof IOrderItemModel> = [
        "id",
        "orderId",
        "name",
        "quantity",
        "price",
        "catalogProduct",
        "catalogProductId"
    ];

    casts = {
        catalogProduct: new ModelCast(CatalogProductModel)
    }

    id = 0;
    orderId = 0;
    name = '';
    quantity = 0;
    price = 0;
    catalogProduct = new CatalogProductModel();
    catalogProductId = 0;

    constructor(payload?: IOrderItemModel) {
        super();

        makeObservable(this, {
            id: observable,
            orderId: observable,
            name: observable,
            quantity: observable,
            price: observable,
            catalogProduct: observable,
            catalogProductId: observable,
            total: computed
        });

        this.update(payload);
    }

    get total() {
        return this.quantity * this.price;
    }
}