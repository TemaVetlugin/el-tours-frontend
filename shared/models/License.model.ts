import { makeObservable, observable } from "mobx";
import { ModelArrayCast } from "shared/casts";
import { MediaModel, MediaModelInterface } from "shared/models/Media.model";

import { Model } from "./Model";

export interface LicenseModelInterface {
    id?: number;
    name?: string;
    file?: string;
    sort?: number;
    media?: MediaModelInterface[];
}

export class LicenseModel extends Model<LicenseModelInterface> implements LicenseModelInterface {
    casts = {
        media: new ModelArrayCast(MediaModel)
    }

    fillable: Array<keyof LicenseModelInterface> = [
        "id",
        "name",
        "file",
        "sort",
        "media",
    ];

    id = 0;
    name = '';
    file = '';
    sort = 0;
    media: MediaModel[] = [];

    constructor(payload?: LicenseModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            file: observable,
            sort: observable,
            media: observable,
        });

        this.update(payload);
    }
}
