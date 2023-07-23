import { makeObservable, observable } from "mobx";

import { ModelCast } from "shared/casts";
import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "./CatalogProduct.model";

export interface UserReminderModelInterface {
    id?: number;
    remindAt?: string;
    catalogProduct?: CatalogProductModelInterface;
}

export class UserReminderModel extends Model<UserReminderModelInterface> implements UserReminderModelInterface {
    casts = {
        catalogProduct: new ModelCast(CatalogProductModel)
    }
    fillable: Array<keyof UserReminderModelInterface> = [
        "id",
        "remindAt",
        "catalogProduct",
    ];

    id = 0;
    remindAt = '';
    catalogProduct: CatalogProductModel = new CatalogProductModel();

    constructor(payload?: UserReminderModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            remindAt: observable,
            catalogProduct: observable,
        });

        this.update(payload);
    }
}
