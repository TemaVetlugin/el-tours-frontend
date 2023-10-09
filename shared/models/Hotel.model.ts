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
    city?: string;
    nights?: string;
    date?: string;
    minPrice?: string;
    tourists?: string;
    facts?: { id: number, slug: string, name: string, iconUrl: string, value: number}[];
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
        "city",
        "nights",
        "date",
        "minPrice",
        "tourists",
        "facts",
    ];

    id= 0;
    category= 0;
    rating= 0;
    photo= '';
    roomType= '';
    address= '';
    hotelName= '';
    city= '';
    nights= '';
    date= '';
    minPrice= '';
    tourists= '';
    facts= [];

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
            city: observable,
            nights: observable,
            date: observable,
            minPrice: observable,
            tourists: observable,
            facts: observable,
        });

        this.update(payload);
    }
}
