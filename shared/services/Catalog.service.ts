import { CatalogCategoryModel, CatalogCategoryModelInterface } from "shared/models";
import { makeAutoObservable } from "mobx";
import { lodash } from "shared/utilities";
import { makeService } from "./utilities/makeService";

type BootType = {
    catalogCategories: CatalogCategoryModelInterface[],
}

export const CatalogService = makeService(class {
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
})
