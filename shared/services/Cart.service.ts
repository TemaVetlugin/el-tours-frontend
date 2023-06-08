import { makeAutoObservable } from "mobx";

import { CartItemModel } from "shared/models";

import { makeService } from "./utilities/makeService";
import { cartItemsQuery, cartItemsSaveQuery } from "shared/queries/main";

export const CartService = makeService(class {
    isLoading = true;
    cartItems: CartItemModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = async () => {
        const { data, isSuccess } = await cartItemsQuery();
        if (isSuccess && data) {
            CartService.set("cartItems", data.items.map(item => new CartItemModel(item)));
        }
        CartService.set("isLoading", false);
    }

    save = async (cartItem: { catalogProductId: number, quantity: number }) => {
        const { isSuccess, data } = await cartItemsSaveQuery({
            catalogProductId: cartItem.catalogProductId,
            quantity: cartItem.quantity
        });

        if (isSuccess && data) {
            CartService.set("cartItems", data.items.map(item => new CartItemModel(item)));
        }
    }

    get totalPrices() {
        let from = 0;
        let to = 0;
        this.cartItems.forEach(cartItem => {
            const prices = cartItem.catalogProduct.catalogProductOffers.map(offer => offer.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            from += min * cartItem.quantity;
            to += max * cartItem.quantity;
        })
        return [from, to];
    }

    get quantity() {
        return this.cartItems.reduce((quantity, cartItem) => {
            return quantity + cartItem.quantity;
        }, 0);
    }
})
