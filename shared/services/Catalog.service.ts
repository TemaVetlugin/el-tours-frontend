import { makeAutoObservable } from "mobx";

import {
    CatalogCategoryModel,
    CatalogCategoryModelInterface,
    CompilationModel,
    CompilationModelInterface
} from "shared/models";
import { lodash } from "shared/utilities";

import { makeService } from "./utilities/makeService";

type BootType = {
    catalogCategories: CatalogCategoryModelInterface[],
    compilations: CompilationModelInterface[]
}

export const CatalogService = makeService(class {
    catalogCategories: CatalogCategoryModel[] = [];
    compilations: CompilationModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ catalogCategories, compilations }: BootType) => {
        this.catalogCategories = catalogCategories.map(item => new CatalogCategoryModel(item));
        this.compilations = compilations.map(item => new CompilationModel(item));

    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, 'catalogCategoryId');
    }
})
