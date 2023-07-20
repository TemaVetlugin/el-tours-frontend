import { makeObservable, observable } from "mobx";

import { Model } from "./Model";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models/CatalogProduct.model";
import { CityModel, CityModelInterface } from "shared/models/City.model";
import { ModelArrayCast } from "shared/casts";

interface CompilationCityModelInterface {
    cityId: number
}

export interface CompilationModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    imageThumbnail?: string;
    catalogProducts?: CatalogProductModelInterface[]
    catalogProductsCount?: number;
    cities?: CityModelInterface[]
}

export class CompilationModel extends Model<CompilationModelInterface> implements CompilationModelInterface {
    casts = {
        cities: new ModelArrayCast(CityModel)
    }
    fillable: Array<keyof CompilationModelInterface> = [
        "id",
        "name",
        "slug",
        "imageThumbnail",
        "catalogProducts",
        "catalogProductsCount",
        "cities"
    ];

    id = 0;
    name = '';
    slug = '';
    imageThumbnail = '';
    catalogProducts: CatalogProductModel[] = [];
    catalogProductsCount = 0;
    cities: CityModel[] = [];

    constructor(payload?: CompilationModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            imageThumbnail: observable,
            catalogProducts: observable,
            catalogProductsCount: observable,
            cities: observable
        });

        this.update(payload);
    }
}
