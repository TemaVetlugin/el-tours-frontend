import { makeAutoObservable, runInAction } from "mobx";

import { CartItemModel } from "shared/models";

import { makeService } from "./utilities/makeService";
import { cartItemsQuery, cartItemsSaveQuery } from "shared/queries/main";

type BootProps = {
    cityId: number
}
export const CartService = makeService(class {
    cartItems: CartItemModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = async ({ cityId }: BootProps) => {
        const { data, isSuccess } = await cartItemsQuery({
            cityId
        });
        if (isSuccess && data) {
            runInAction(() => {
                this.cartItems = data.items.map(item => new CartItemModel(item));
            })
        }
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
