import { makeAutoObservable } from "mobx";

import { IUserModel, UserModel } from "shared/models";
import { UserTypeEnum } from "shared/enums";
import { Cache } from "shared/utilities";

export const UserModule = new class {
    accessToken: string = '';
    user: UserModel = new UserModel({});

    get isAuthorized() {
        return this.user.type.is(UserTypeEnum.Verified);
    }

    constructor() {
        makeAutoObservable(this);
    }

    mount = (accessToken: string, user: IUserModel) => {
        this.setAccessToken(accessToken);
        UserModule.user.update(user)
    }

    getAccessToken = async () => {
        if (this.accessToken) {
            return this.accessToken
        }

        return await Cache.get<string, null>('UserModule.accessToken', null);
    }

    setAccessToken = (accessToken: string) => {
        this.accessToken = accessToken;
        Cache.set('UserModule.accessToken', accessToken);
    }
}
