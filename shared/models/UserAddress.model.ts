import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface UserAddressModelInterface {
    id?: number;
    address?: string,
    apartment?: string,
    floor?: string,
    entrance?: string,
    intercom?: string,
    comment?: string,
}

export class UserAddressModel extends Model<UserAddressModelInterface> implements UserAddressModelInterface {
    fillable: Array<keyof UserAddressModelInterface> = [
        "id",
        "address",
        "apartment",
        "floor",
        "entrance",
        "intercom",
        "comment",
    ];

    id = 0;
    address = '';
    apartment = '';
    floor = '';
    entrance = '';
    intercom = '';
    comment = '';

    constructor(payload?: UserAddressModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            address: observable,
            apartment: observable,
            floor: observable,
            entrance: observable,
            intercom: observable,
            comment: observable,
            value: computed
        });

        this.update(payload);
    }

    get value() {
        return [
            this.address,
            this.apartment ? `кв/офис ${this.apartment}` : null,
            this.floor ? `этаж ${this.floor}` : null,
        ].filter(item => !!item).join(', ');
    }
}
