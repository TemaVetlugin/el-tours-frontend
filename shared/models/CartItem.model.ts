import { makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { CatalogProductModel, CatalogProductModelInterface } from "./CatalogProduct.model";
import { Model } from "./Model";
import { OrderItemModel, OrderItemModelInterface } from "shared/models/OrderItem.model";

export interface CartItemModelInterface {
    id?: number;
    catalogProductId?: number;
    quantity?: number | null;
    catalogProduct?: CatalogProductModelInterface;
    orderItem?: OrderItemModelInterface;
}

export class CartItemModel extends Model<CartItemModelInterface> implements CartItemModelInterface {
    casts = {
        catalogProduct: new ModelCast(CatalogProductModel),
        orderItem: new ModelCast(OrderItemModel)
    };

    fillable: Array<keyof CartItemModelInterface> = [
        "id",
        "catalogProductId",
        "quantity",
        "orderItem",
        "catalogProduct",
    ];

    id = 0;
    catalogProductId = 0;
    quantity = 0;
    catalogProduct = new CatalogProductModel();
    orderItem = new OrderItemModel();

    constructor(payload?: CartItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            quantity: observable,
            catalogProductId: observable,
            catalogProduct: observable,
            orderItem: observable,
        });

        this.update(payload);
    }
}
