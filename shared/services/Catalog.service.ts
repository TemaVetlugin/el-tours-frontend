import { CatalogCategoryModel, CatalogCategoryModelInterface } from "shared/models";
import { makeAutoObservable } from "mobx";
import { lodash } from "shared/utilities";

type BootType = {
    catalogCategories: CatalogCategoryModelInterface[],
}
export const CatalogService = new class {
    catalogCategories: CatalogCategoryModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ catalogCategories }: BootType) => {
        this.catalogCategories = catalogCategories.map(item => new CatalogCategoryModel(item));
    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, 'catalogCategoryId');
    }
}
