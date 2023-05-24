import { action, computed, makeObservable, observable } from "mobx";

import { CartItemModel, CatalogProductOfferModel, ICartItemModel } from "shared/models";
import { lodash } from "shared/utilities";
import { cartItemsUpdateRequest } from "shared/requests/api";

export const OrderModule = new class {
    cartItems: CartItemModel[] = [];

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            mount: action,
            deleteCartItem: action,
            cartItemByCatalogProductId: computed,
            activeCartItems: computed,
        })
    }

    get cartItemByCatalogProductId() {
        return lodash.keyBy(this.cartItems, 'catalogProductId');
    }

    get activeCartItems() {
        return this.cartItems.filter(cartItem => cartItem.isActive);
    }

    mount = (cartItems: ICartItemModel[], replace = false) => {
        if (cartItems.length < this.cartItems.length || replace) {
            this.cartItems = cartItems.map(cartItem => new CartItemModel(cartItem));
            return;
        }
        const cartItemsToAdd: CartItemModel[] = [];
        cartItems.forEach(cartItemRaw => {
            const cartItem = this.cartItems.find(cartItem => cartItem.id === cartItemRaw.id);
            if (!cartItem) {
                cartItemsToAdd.push(new CartItemModel(cartItemRaw));
            }
        })
        this.cartItems = [...this.cartItems, ...cartItemsToAdd];
    }

    inCart = (catalogProductId: number) => {
        return this.cartItemByCatalogProductId.hasOwnProperty(catalogProductId)
    }

    addCartItem = async (catalogProductId: number) => {
        const { isSuccess, data } = await cartItemsUpdateRequest({
            catalogProductId,
            quantity: 1,
            withCartItems: true,
        });
        if (isSuccess && data) {
            this.mount(data.items);
        }
    }

    updateCartItem = async ({ catalogProductId, quantity }: ICartItemModel) => {
        if (catalogProductId !== undefined && quantity !== undefined) {
            await cartItemsUpdateRequest({ catalogProductId, quantity });
        }
    }

    deleteCartItem = (catalogProductId: number) => {
        this.cartItems = this.cartItems.filter(cartItem => +cartItem.catalogProductId !== +catalogProductId);
        cartItemsUpdateRequest({ catalogProductId, quantity: 0 });
    }

    getCatalogProductOffersPrice = (storeId: number | null = null, withQuantityCheck = true) => {
        if (storeId === null) {
            return this.activeCartItems.reduce((totalPrice, cartItem) => {
                const catalogProductOffer = lodash.minBy(cartItem.catalogProduct.catalogProductOffers, 'price');
                if (!catalogProductOffer || (withQuantityCheck && +catalogProductOffer.quantity < +cartItem.quantity)) {
                    return totalPrice;
                }
                return totalPrice + catalogProductOffer.price * cartItem.quantity;
            }, 0);
        }

        return this.activeCartItems.reduce((totalPrice, cartItem) => {
            const catalogProductOffer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === storeId)
            if (!catalogProductOffer || +catalogProductOffer.quantity < +cartItem.quantity) {
                return totalPrice;
            }
            return totalPrice + catalogProductOffer.price * cartItem.quantity;
        }, 0);
    }

    getAvailability = (storeId: number) => {
        const items: {
            catalogProductsOffer: CatalogProductOfferModel,
            cartItem: CartItemModel
        }[] = [];

        this.activeCartItems.forEach((cartItem) => {
            const catalogProductsOffer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === storeId)
            if (!catalogProductsOffer || +cartItem.quantity > +catalogProductsOffer.quantity) {
                return;
            }
            items.push({ catalogProductsOffer, cartItem });
        });

        return {
            items,
            isCover: items.length === OrderModule.activeCartItems.length
        }
    }

    getCartItemsCount = (storeId: number | null = null) => {
        if (storeId === null) {
            return this.activeCartItems.map(cartItem => cartItem.quantity)
                .reduce((count, quantity) => count + quantity, 0);
        }

        return this.activeCartItems.map(cartItem => {
            if (!cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === storeId)) {
                return 0;
            }
            return cartItem.quantity;
        }).reduce((count, quantity) => count + quantity, 0);
    }
}
