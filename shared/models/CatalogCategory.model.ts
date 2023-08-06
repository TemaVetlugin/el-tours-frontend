import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface CatalogCategoryModelInterface {
    id?: number;
    catalogCategoryId?: number | null;
    catalogProductsCount?: number;
    catalogCategoriesCount?: number;
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
        "catalogCategoriesCount",
    ];

    id = 0;
    name = '';
    slug = '';
    image = '';
    imageThumbnail = '';
    icon = '';
    catalogCategoryId: number | null = null;
    catalogProductsCount: number = 0;
    catalogCategoriesCount: number = 0;

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
            catalogCategoriesCount: observable,
        });

        this.update(payload);
    }
}
