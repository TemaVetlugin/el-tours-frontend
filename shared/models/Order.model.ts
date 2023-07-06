import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { Model } from "./Model";
import { OrderItemModel, OrderItemModelInterface } from "./OrderItem.model";
import { StoreModel, StoreModelInterface } from "./Store.model";
import { OrderDeliveryTypeEnum, OrderPaymentTypeEnum, OrderStatusEnum } from "shared/enums";

export interface OrderModelInterface {
    id?: number;
    createdAt?: string;
    statusId?: string;
    deliveryTypeId?: string;
    deliveryDate?: string;
    deliveryTime?: string;
    deliveryAddress?: string;
    paymentTypeId?: string;
    orderItems?: OrderItemModelInterface[],
    store?: StoreModelInterface,
    loyaltyDiscount?: number
    totalOriginal?: number
    totalOffer?: number
    totalLoyalty?: number
    totalLoyaltyPromocode?: number
    totalLoyaltyGift?: number
    totalLoyaltyDiscount?: number
    totalDelivery?: number
    total?: number
}

export class OrderModel extends Model<OrderModelInterface> implements OrderModelInterface {
    fillable: Array<keyof OrderModelInterface> = [
        "id",
        "createdAt",
        "statusId",
        "deliveryTypeId",
        "deliveryDate",
        "deliveryTime",
        "deliveryAddress",
        "paymentTypeId",
        "orderItems",
        "store",
        "loyaltyDiscount",
        "totalOriginal",
        "total",
        "totalOffer",
        "totalLoyalty",
        "totalLoyaltyPromocode",
        "totalLoyaltyGift",
        "totalLoyaltyDiscount",
        "totalDelivery",
        "total",
    ];

    casts = {
        orderItems: new ModelArrayCast(OrderItemModel),
        store: new ModelCast(StoreModel),
    }

    id = 0;
    createdAt = '';
    statusId = '';
    deliveryTypeId = '';
    deliveryDate = '';
    deliveryTime = '';
    deliveryAddress = '';
    paymentTypeId = '';
    orderItems: OrderItemModel[] = [];
    store = new StoreModel();
    loyaltyDiscount = 0;
    totalOriginal = 0;
    totalOffer = 0;
    totalLoyalty = 0;
    totalLoyaltyPromocode = 0;
    totalLoyaltyGift = 0;
    totalLoyaltyDiscount = 0;
    totalDelivery = 0;
    total = 0;

    constructor(payload?: OrderModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            createdAt: observable,
            statusId: observable,
            deliveryTypeId: observable,
            deliveryDate: observable,
            deliveryTime: observable,
            deliveryAddress: observable,
            paymentTypeId: observable,
            orderItems: observable,
            store: observable,
            totalOffer: observable,
            totalLoyalty: observable,
            totalLoyaltyPromocode: observable,
            totalLoyaltyGift: observable,
            totalLoyaltyDiscount: observable,
            totalDelivery: observable,
            total: observable,
            quantity: computed,
            code: computed,
            status: computed,
            deliveryType: computed,
            paymentType: computed,
        });

        this.update(payload);
    }

    get quantity() {
        return this.orderItems.reduce((total, orderItem) => {
            return total + orderItem.quantity;
        }, 0);
    }

    get deliveryType() {
        return OrderDeliveryTypeEnum.from(this.deliveryTypeId);
    }

    get paymentType() {
        return OrderPaymentTypeEnum.from(this.paymentTypeId);
    }

    get status() {
        return OrderStatusEnum.from(this.statusId);
    }

    get code() {
        return `${this.id}`.padStart(6, '0')
    }
}
