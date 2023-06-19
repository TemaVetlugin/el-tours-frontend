import { computed, makeObservable, observable } from "mobx";

import { UserTypeEnum } from "shared/enums";
import { ModelArrayCast } from "shared/casts";

import { UserStoreModel, UserStoreModelInterface } from "./UserStore.model";
import { UserFavoriteModel, UserFavoriteModelInterface } from "./UserFavorite.model";
import { Model } from "./Model";

export interface UserModelInterface {
    id?: number;
    typeId?: string;
    cityId?: number | null,
    phone?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    birthdate?: string;
    email?: string;
    cityConfirmed?: boolean;
    isInitialized?: boolean;
    userFavorites?: UserFavoriteModelInterface[]
    userStores?: UserStoreModelInterface[],
}

export class UserModel extends Model<UserModelInterface> implements UserModelInterface {
    casts = {
        userFavorites: new ModelArrayCast(UserFavoriteModel),
        userStores: new ModelArrayCast(UserStoreModel),
    }

    fillable: Array<keyof UserModelInterface> = [
        "id",
        "typeId",
        "cityId",
        "phone",
        "cityConfirmed",
        "firstname",
        "lastname",
        "middlename",
        "birthdate",
        "email",
        "isInitialized",
        "userFavorites",
        "userStores"
    ];

    id = 0;
    cityId = 0;
    typeId = UserTypeEnum.Anonymous.id;
    phone = '';
    firstname = '';
    lastname = '';
    middlename = '';
    birthdate = '';
    email = '';
    cityConfirmed = false;
    isInitialized: boolean = false;
    userFavorites: UserFavoriteModel[] = [];
    userStores: UserStoreModel[] = [];

    constructor(payload: UserModelInterface = {}) {
        super();

        makeObservable(this, {
            id: observable,
            typeId: observable,
            cityId: observable,
            phone: observable,
            cityConfirmed: observable,
            firstname: observable,
            lastname: observable,
            middlename: observable,
            email: observable,
            birthdate: observable,
            isInitialized: observable,
            userStores: observable,
            userFavorites: observable,
            type: computed,
        });

        this.update(payload);
    }

    get type() {
        return UserTypeEnum.from(this.typeId);
    }

    get isAuthorized() {
        return this.type.is(UserTypeEnum.Verified);
    }
}
