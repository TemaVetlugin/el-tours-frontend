import { makeAutoObservable } from "mobx";

import { makeService } from "./utilities/makeService";
import { HotelModel } from "shared/models";

export const HotelService = makeService(class {
    hotels: HotelModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }


})
