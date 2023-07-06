import { runInAction, set } from "mobx";

import { Cast } from "shared/casts/Cast";

export class Model<IChildModel> {
    [key: string]: any;

    fillable: Array<keyof IChildModel> = [];
    casts: Partial<Record<keyof IChildModel, Cast>> = {};

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

    handleChange = <R>(data: { name: string, value: R }) => {
        runInAction(() => {
            set(this, data.name, data.value);
        });
    }
}
