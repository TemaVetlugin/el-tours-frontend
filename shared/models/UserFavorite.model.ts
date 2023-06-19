import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface UserFavoriteModelInterface {
    id?: number;
    catalogProductId?: number;
}

export class UserFavoriteModel extends Model<UserFavoriteModelInterface> implements UserFavoriteModelInterface {
    fillable: Array<keyof UserFavoriteModelInterface> = [
        "id",
        "catalogProductId",
    ];

    id = 0;
    catalogProductId = 0;

    constructor(payload: UserFavoriteModelInterface = {}) {
        super();

        makeObservable(this, {
            id: observable,
            catalogProductId: observable,
        });

        this.update(payload);
    }
}
