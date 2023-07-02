import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { Model } from "./Model";
import { CartItemModel, CartItemModelInterface } from "shared/models/CartItem.model";
import { StoreModel, StoreModelInterface } from "shared/models/Store.model";
import { OrderModel, OrderModelInterface } from "shared/models/Order.model";

export interface CheckoutItemModelInterface {
    id?: number;
    store?: StoreModelInterface | null;
    cartItems?: CartItemModelInterface[];
    order?: OrderModelInterface
}

export class CheckoutItemModel extends Model<CheckoutItemModelInterface> implements CheckoutItemModelInterface {
    fillable: Array<keyof CheckoutItemModelInterface> = [
        "id",
        "store",
        "cartItems",
        "order"
    ];

    casts = {
        store: new ModelCast(StoreModel),
        cartItems: new ModelArrayCast(CartItemModel),
        order: new ModelCast(OrderModel),
    };

    id = 0;
    store: StoreModel = new StoreModel();
    order: OrderModel = new OrderModel();
    cartItems: CartItemModel[] = [];

    constructor(payload?: CheckoutItemModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            store: observable,
            cartItems: observable,
            order: observable,
            quantity: computed
        });

        this.update(payload);
    }

    get quantity() {
        return this.cartItems.reduce((quantity, cartItem) => {
            return quantity + cartItem.quantity;
        }, 0);
    }
}
