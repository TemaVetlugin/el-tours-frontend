import { makeAutoObservable, runInAction } from "mobx";

import { UserModel } from "shared/models";
import { Cache } from "shared/utilities/client";
import { usersBoot } from "shared/queries/main";
import { retryQuery } from "shared/queries/utilities";

export const UserService = new class {
    accessToken: string | null = null;
    user: UserModel = new UserModel();

    constructor() {
        makeAutoObservable(this);
    }

    boot = async () => {
        const accessToken = await Cache.get<string>('accessToken');
        const { isSuccess, data } = await retryQuery(async () => await usersBoot({ accessToken }), {
            delay: 2500,
        });
        if (isSuccess && data) {
            runInAction(() => {
                this.accessToken = data.accessToken;
                this.user = new UserModel(data.item);
            });
            await Cache.set('accessToken', data.accessToken);
        }
    }
}
