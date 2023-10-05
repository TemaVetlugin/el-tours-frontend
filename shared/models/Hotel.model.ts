import {makeObservable, observable} from "mobx";

import {Model} from "./Model";

export interface HotelModelInterface {
    id?: number;
    category?: number;
    rating?: number;
    photo?: string;
    roomType?: string;
    address?: string;
    hotelName?: string;
}

export class HotelModel extends Model<HotelModelInterface> implements HotelModelInterface {

    fillable: Array<keyof HotelModelInterface> = [
        "id",
        "category",
        "rating",
        "photo",
        "roomType",
        "address",
        "hotelName",
    ];

    id= 0;
    category= 0;
    rating= 0;
    photo= '';
    roomType= '';
    address= '';
    hotelName= '';

    constructor(payload?: HotelModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            category: observable,
            rating: observable,
            photo: observable,
            roomType: observable,
            address: observable,
            hotelName: observable,
        });

        this.update(payload);
    }
}
