import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { ModelArrayCast } from "shared/casts";

export interface VacancyModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    salary?: string;
    subtitle?: string;
    description?: string;
    content?: string;
}

export class VacancyModel extends Model<VacancyModelInterface> implements VacancyModelInterface {

    fillable: Array<keyof VacancyModelInterface> = [
        "id",
        "name",
        "salary",
        "subtitle",
        "description",
        "slug",
        "content",
    ];

    id = 0;
    name = '';
    slug = '';
    salary = '';
    subtitle = '';
    description = '';
    content = '';

    constructor(payload?: VacancyModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            salary: observable,
            subtitle: observable,
            description: observable,
            content: observable,
        });

        this.update(payload);
    }
}
