import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface WorkerModelInterface {
    id?: number;
    name?: string;
    sort?: number;
    job?: string;
    phone?: string;
    photo?: string;
    email?: string;
    address?: string;
    category?: number;
}

export class WorkerModel extends Model<WorkerModelInterface> implements WorkerModelInterface {

    fillable: Array<keyof WorkerModelInterface> = [
        "id",
        "name",
        "sort",
        "job",
        "phone",
        "photo",
        "email",
        "address",
        "category",
    ];



    id= 0;
    name= '';
    sort= 0;
    job= '';
    phone= '';
    photo= '';
    email= '';
    address= '';
    category= 0;

    constructor(payload?: WorkerModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            sort: observable,
            job: observable,
            phone: observable,
            photo: observable,
            email: observable,
            address: observable,
            category: observable,
        });

        this.update(payload);
    }
}
