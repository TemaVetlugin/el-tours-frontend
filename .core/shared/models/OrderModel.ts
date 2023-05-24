import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { IOrderItemModel, OrderItemModel } from "./OrderItemModel";
import { OrderStatusEnum } from "shared/enums";
import { ModelArrayCast, ModelCast } from "shared/casts";
import { IStoreModel, StoreModel } from "shared/models/StoreModel";

export interface IOrderModel {
    id?: number;
    code?: string;
    createdAt?: string;
    statusId?: number;
    orderItems?: IOrderItemModel[],
    store?: IStoreModel,
}

export class OrderModel extends Model<IOrderModel> implements IOrderModel {
    fillable: Array<keyof IOrderModel> = [
        "id",
        "code",
        "createdAt",
        "statusId",
        "orderItems",
        "store",
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

    constructor(payload?: IOrderModel) {
        super();

        makeObservable(this, {
            id: observable,
            code: observable,
            createdAt: observable,
            statusId: observable,
            orderItems: observable,
            store: observable,
            total: computed,
            quantity: computed,
            status: computed,
        });

        this.update(payload);
    }

    get status(){
        return OrderStatusEnum.from(this.statusId);
    }

    get quantity() {
        return this.orderItems.reduce((total, orderItem) => {
            return total + orderItem.quantity;
        }, 0);
    }

    get total() {
        return this.orderItems.reduce((total, orderItem) => {
            return total + orderItem.total;
        }, 0);
    }
}
