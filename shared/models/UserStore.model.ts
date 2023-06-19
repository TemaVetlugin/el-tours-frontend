import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface UserStoreModelInterface {
    id?: number;
    storeId?: number;
}

export class UserStoreModel extends Model<UserStoreModelInterface> implements UserStoreModelInterface {
    fillable: Array<keyof UserStoreModelInterface> = [
        "id",
        "storeId",
    ];

    id = 0;
    storeId = 0;

    constructor(payload: UserStoreModelInterface = {}) {
        super();

        makeObservable(this, {
            id: observable,
            storeId: observable,
        });

        this.update(payload);
    }
}
