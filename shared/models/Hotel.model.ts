import {makeObservable, observable} from "mobx";

import {Model} from "./Model";

export interface HotelModelInterface {
    id?: number;
    hotelName?: string;
}

export class HotelModel extends Model<HotelModelInterface> implements HotelModelInterface {

    fillable: Array<keyof HotelModelInterface> = [
        "id",
        "hotelName",
    ];

    id = 0;
    hotelName = '';

    constructor(payload?: HotelModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            hotelName: observable,
        });

        this.update(payload);
    }
}
