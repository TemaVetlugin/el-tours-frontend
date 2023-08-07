import { makeObservable, observable } from "mobx";
import { ModelArrayCast } from "shared/casts";
import { LicenseModel, LicenseModelInterface } from "shared/models/License.model";

import { Model } from "./Model";

export interface LicenseSectionModelInterface {
    id?: number;
    name?: string;
    description?: string;
    licenses?: LicenseModelInterface[];
    sort?: string;
}

export class LicenseSectionModel extends Model<LicenseSectionModelInterface> implements LicenseSectionModelInterface {
    casts = {
        licenses: new ModelArrayCast(LicenseModel)
    }

    fillable: Array<keyof LicenseSectionModelInterface> = [
        "id",
        "name",
        "description",
        "licenses",
        "sort"
    ];

    id = 0;
    name = '';
    description = '';
    licenses: LicenseModel[] = [];
    sort = '';

    constructor(payload?: LicenseSectionModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            description: observable,
            licenses: observable,
            sort: observable
        });

        this.update(payload);
    }
}
