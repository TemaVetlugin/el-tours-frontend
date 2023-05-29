import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface CatalogCategoryModelInterface {
    id?: number;
    catalogCategoryId?: number | null;
    catalogProductsCount?: number | null;
    name?: string;
    slug?: string;
    image?: string;
    imageThumbnail?: string;
    icon?: string;
}

export class CatalogCategoryModel extends Model<CatalogCategoryModelInterface> implements CatalogCategoryModelInterface {
    fillable: Array<keyof CatalogCategoryModelInterface> = [
        "id",
        "name",
        "slug",
        "image",
        "imageThumbnail",
        "icon",
        "catalogCategoryId",
        "catalogProductsCount",
    ];

    id = 0;
    name = '';
    slug = '';
    image = '';
    imageThumbnail = '';
    icon = '';
    catalogCategoryId: number | null = null;
    catalogProductsCount: number | null = null;

    constructor(payload?: CatalogCategoryModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            image: observable,
            imageThumbnail: observable,
            icon: observable,
            catalogCategoryId: observable,
            catalogProductsCount: observable,
        });

        this.update(payload);
    }
}
