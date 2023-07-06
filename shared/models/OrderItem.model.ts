import { computed, makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";

import { CatalogProductModelInterface, CatalogProductModel } from "./CatalogProduct.model";
import { Model } from "./Model";

export interface OrderItemModelInterface {
    id?: number;
    orderId?: number;
    name?: string;
    quantity?: number;
    priceOffer?: number;
    totalOffer?: number;
    total?: number;
    catalogProduct?: CatalogProductModelInterface | null;
    catalogProductId?: number;
}

export class OrderItemModel extends Model<OrderItemModelInterface> implements OrderItemModelInterface {
    fillable: Array<keyof OrderItemModelInterface> = [
        "id",
        "orderId",
        "name",
        "quantity",
        "priceOffer",
        "totalOffer",
        "total",
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
    priceOffer = 0;
    totalOffer = 0;
    total = 0;
    catalogProduct: CatalogProductModel | null = null;
    catalogProductId = 0;

    constructor(payload?: OrderItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            orderId: observable,
            name: observable,
            quantity: observable,
            priceOffer: observable,
            totalOffer: observable,
            total: observable,
            catalogProduct: observable,
            catalogProductId: observable,
        });

        this.update(payload);
    }
}
