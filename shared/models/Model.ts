import { runInAction } from "mobx";

import { ICast } from "shared/casts/Cast";

export class Model<IChildModel> {
    [key: string]: any;

    fillable: Array<keyof IChildModel> = [];
    casts: Partial<Record<keyof IChildModel, ICast>> = {};

    update(payload: { [Property in keyof IChildModel]: any } | undefined) {
        if (!payload) {
            return;
        }
        runInAction(() => {
            this.fillable.forEach((property: keyof IChildModel) => {
                const key: string = property.toString();
                if (payload.hasOwnProperty(key)) {
                    this[key] = this.casts[property]?.set(this[key], payload[property]) || payload[property];
                }
            });
        });
    }
}
