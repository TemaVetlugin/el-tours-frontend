import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface UserAddressModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImage?: string;
}

export class UserAddressModel extends Model<UserAddressModelInterface> implements UserAddressModelInterface {
    fillable: Array<keyof UserAddressModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImage",
    ];

    id = 0;
    name = '';
    slug = '';
    previewImage = '';

    constructor(payload?: UserAddressModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImage: observable,
        });

        this.update(payload);
    }
}
