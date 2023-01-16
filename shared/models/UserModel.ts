import { computed, makeObservable, observable } from "mobx";

import { UserTypeEnum } from "shared/enums";

import { Model } from "./Model";
import { CityModel, ICityModel } from "./CityModel";
import { ModelCast } from "shared/casts";

export interface IUserModel {
    id?: number;
    typeId?: string;
    city?: ICityModel;
    phone?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    birthdate?: string;
    email?: string;
    cityConfirmed?: boolean;
}

export class UserModel extends Model<IUserModel> implements IUserModel {
    casts = {
        city: new ModelCast(CityModel)
    }

    fillable: Array<keyof IUserModel> = [
        "id",
        "typeId",
        "city",
        "phone",
        "cityConfirmed",
        "firstname",
        "lastname",
        "middlename",
        "birthdate",
        "email",
    ];

    id = 0;
    typeId = '';
    phone = '';
    firstname = '';
    lastname = '';
    middlename = '';
    birthdate = '';
    email = '';
    cityConfirmed = false;
    city: CityModel = new CityModel();

    constructor(payload: IUserModel) {
        super();

        makeObservable(this, {
            id: observable,
            typeId: observable,
            city: observable,
            phone: observable,
            cityConfirmed: observable,
            firstname: observable,
            lastname: observable,
            middlename: observable,
            email: observable,
            birthdate: observable,
            type: computed,
        });

        this.update(payload);
    }

    get type() {
        return UserTypeEnum.from(this.typeId);
    }
}
