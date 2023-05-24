import { Cast } from "./Cast";

export class ModelCast implements Cast {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    set = (currentValue: any, newValue: any) => {
        if (!!currentValue && currentValue['update'] && typeof currentValue['update'] === 'function') {
            currentValue['update'](newValue);
        }

        return new this.model(newValue);
    }
}
