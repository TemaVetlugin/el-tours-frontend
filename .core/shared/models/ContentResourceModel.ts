import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IContentResourceModel {
    id?: number;
    isActive?: boolean;
    name?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
}

export class ContentResourceModel extends Model<IContentResourceModel> implements IContentResourceModel {
    fillable: Array<keyof IContentResourceModel> = [
        "id",
        "name",
        "isActive",
        "image1",
        "image2",
        "image3",
        "image4",
        "value1",
        "value2",
        "value3",
        "value4",
    ];

    id = 0;
    name = '';
    isActive = false;
    image1 = '';
    image2 = '';
    image3 = '';
    image4 = '';
    value1 = '';
    value2 = '';
    value3 = '';
    value4 = '';

    constructor(payload?: IContentResourceModel) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            isActive: observable,
            image1: observable,
            image2: observable,
            image3: observable,
            image4: observable,
            value1: observable,
            value2: observable,
            value3: observable,
            value4: observable,
        });
        this.update(payload);
    }
}
