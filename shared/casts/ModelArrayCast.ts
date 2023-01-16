import { Cast } from "./Cast";

export class ModelArrayCast implements Cast {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    set = (currentValue: any[], newValue: any[]) => {
        return newValue.map(item => new this.model(item));
    }
}
