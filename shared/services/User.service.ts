import { makeAutoObservable, runInAction } from "mobx";

import { UserModel } from "shared/models";
import { Cache } from "shared/utilities/client";
import { usersBootQuery } from "shared/queries/main";
import { retryQuery } from "shared/queries/utilities";

import { LocationService } from "./Location.service";
import { AppService } from "./App.service";

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

    isAuthorized = (require = true) => {
        if (this.user.isAuthorized) {
            return true;
        }
        if (require) {
            AppService.loginIsOpened = true;
        }
        return false;
    }



    toggleFavorite = async (catalogProductId: number) => {
        if (!this.isAuthorized()) {
            return;
        }


    }
});
