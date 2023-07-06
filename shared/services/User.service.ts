import { makeAutoObservable, runInAction } from "mobx";

import { UserModel } from "shared/models";
import { Cache } from "shared/utilities/client";
import { userFavoriteToggleQuery, usersBootQuery } from "shared/queries/main";
import { retryQuery } from "shared/queries/utilities";

import { LocationService } from "./Location.service";
import { LayoutService } from "./Layout.service";
import { CartService } from "./Cart.service";

import { makeService } from "./utilities/makeService";

export const UserService = makeService(class {
    isLoading = true;
    accessToken: string | null = null;
    user: UserModel = new UserModel({
        isInitialized: false
    });

    constructor() {
        makeAutoObservable(this);
    }

    boot = async (_accessToken: string | null = null) => {
        let accessToken = _accessToken;
        if (!accessToken) {
            accessToken = await Cache.get<string>('accessToken');
        }
        const { isSuccess, data } = await retryQuery(async () => await usersBootQuery({ accessToken }), {
            delay: 2500,
        });
        if (isSuccess && data) {
            runInAction(() => {
                this.accessToken = data.accessToken
                this.user = new UserModel({
                    ...data.item,
                    isInitialized: true
                });
                Cache.set('accessToken', data.accessToken);
                if (data.item.cityId) {
                    LocationService.setCity(data.item.cityId)
                }
                CartService.boot({
                    cityId: LocationService.city.id
                });
            });
        }
        runInAction(() => {
            this.isLoading = false;
        });
    }

    logout = async () => {
        await Cache.set('accessToken', '');
        runInAction(() => {
            this.accessToken = null;
            this.user = new UserModel();
            this.boot();
        });
    }

    isAuthorized = (showModal = true) => {
        if (this.user.isAuthorized) {
            return true;
        }
        if (showModal) {
            LayoutService.loginIsOpened = true;
        }
        return false;
    }

    hasFavorite = (catalogProductId: number) => {
        return this.user.userFavorites.some(userFavorite => userFavorite.catalogProductId === catalogProductId);
    }

    toggleFavorite = async (catalogProductId: number) => {
        if (!this.isAuthorized()) {
            return;
        }

        // optimistic update
        UserService.user.update({
            userFavorites: this.hasFavorite(catalogProductId)
                ? UserService.user.userFavorites.filter(userFavorite => userFavorite.catalogProductId !== catalogProductId)
                : [
                    ...UserService.user.userFavorites,
                    {
                        id: Date.now(),
                        catalogProductId
                    }
                ]
        });

        const { isSuccess, data } = await userFavoriteToggleQuery({
            catalogProductId
        });
        if (isSuccess && data) {
            this.user.update({
                userFavorites: data.items
            });
        }
    }
});
