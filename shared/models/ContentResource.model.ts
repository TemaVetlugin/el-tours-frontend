import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CityModel, CityModelInterface } from "./City.model";
import { ModelArrayCast } from "shared/casts";

export interface ContentResourceModelInterface {
    id?: number;
    code?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    cities?: CityModelInterface[]
}

export class ContentResourceModel extends Model<ContentResourceModelInterface> implements ContentResourceModelInterface {
    casts = {
        cities: new ModelArrayCast(CityModel)
    }
    fillable: Array<keyof ContentResourceModelInterface> = [
        "id",
        "code",
        "value1",
        "value2",
        "value3",
        "value4",
        "image1",
        "image2",
        "image3",
        "image4",
        "cities",
    ];

    id = 0;
    code = '';
    value1 = '';
    value2 = '';
    value3 = '';
    value4 = '';
    image1 = '';
    image2 = '';
    image3 = '';
    image4 = '';
    cities: CityModel[] = [];

    constructor(payload?: ContentResourceModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            code: observable,
            value1: observable,
            value2: observable,
            value3: observable,
            value4: observable,
            image1: observable,
            image2: observable,
            image3: observable,
            image4: observable,
            cities: observable,
        });

        this.update(payload);
    }

    get location(): [number, number] {
        return [this.latitude, this.longitude];
    }
}
