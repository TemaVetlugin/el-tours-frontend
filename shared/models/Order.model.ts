import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { Model } from "./Model";
import { OrderItemModelInterface, OrderItemModel } from "./OrderItem.model";
import { StoreModelInterface, StoreModel } from "./Store.model";

export interface OrderModelInterface {
    id?: number;
    code?: string;
    createdAt?: string;
    statusId?: number;
    orderItems?: OrderItemModelInterface[],
    store?: StoreModelInterface,
    loyaltyDiscount?: number
    totalOriginal?: number
    total?: number
}

export class OrderModel extends Model<OrderModelInterface> implements OrderModelInterface {
    fillable: Array<keyof OrderModelInterface> = [
        "id",
        "code",
        "createdAt",
        "statusId",
        "orderItems",
        "store",
        "loyaltyDiscount",
        "totalOriginal",
        "total",
    ];

    casts = {
        orderItems: new ModelArrayCast(OrderItemModel),
        store: new ModelCast(StoreModel),
    }

    id = 0;
    code = '';
    createdAt = '';
    statusId = 0;
    orderItems: OrderItemModel[] = [];
    store = new StoreModel();
    loyaltyDiscount = 0;
    totalOriginal = 0;
    total = 0;

    constructor(payload?: OrderModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            code: observable,
            createdAt: observable,
            statusId: observable,
            orderItems: observable,
            store: observable,
            total: observable,
            loyaltyDiscount: observable,
            totalOriginal: observable,
            quantity: computed,
        });

        this.update(payload);
    }

    get quantity() {
        return this.orderItems.reduce((total, orderItem) => {
            return total + orderItem.quantity;
        }, 0);
    }
}
