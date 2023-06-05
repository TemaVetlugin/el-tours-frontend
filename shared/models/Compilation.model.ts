import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

interface CompilationCityModelInterface {
    cityId: number
}

export interface CompilationModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    imageThumbnail?: string;
    catalogProductsCount?: number;
    compilationCities?: CompilationCityModelInterface[]
}

export class CompilationModel extends Model<CompilationModelInterface> implements CompilationModelInterface {
    casts = {}
    fillable: Array<keyof CompilationModelInterface> = [
        "id",
        "name",
        "slug",
        "imageThumbnail",
        "catalogProductsCount",
        "compilationCities"
    ];

    id = 0;
    name = '';
    slug = '';
    imageThumbnail = '';
    catalogProductsCount = 0;
    compilationCities: CompilationCityModelInterface[] = [];

    constructor(payload?: CompilationModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            imageThumbnail: observable,
            catalogProductsCount: observable,
            compilationCities: observable
        });

        this.update(payload);
    }
}
