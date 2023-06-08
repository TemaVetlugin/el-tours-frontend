import { computed, makeObservable, observable } from "mobx";

import { UserTypeEnum } from "shared/enums";

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
}

export class UserModel extends Model<UserModelInterface> implements UserModelInterface {
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
