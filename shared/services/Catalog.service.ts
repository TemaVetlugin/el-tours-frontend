import { makeAutoObservable } from "mobx";

import {
    CatalogCategoryModel,
    CatalogCategoryModelInterface,
    CompilationModel,
    CompilationModelInterface
} from "shared/models";
import { lodash } from "shared/utilities";

import { makeService } from "./utilities/makeService";
import { ROUTES } from "shared/contants";
import { ReturnType } from "shared/types";

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

    get catalogCategoryById() {
        return lodash.keyBy(this.catalogCategories, 'id');
    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, 'catalogCategoryId');
    }

    breadcrumbs = (catalogCategoryId: number | null = null) => {
        let breadcrumbs: ReturnType<typeof ROUTES.CATALOG>[] = [];

        if (!catalogCategoryId) {
            return [ROUTES.CATALOG()];
        }

        const catalogCategory = this.catalogCategoryById[catalogCategoryId] ?? null;

        if (!catalogCategory) {
            return [ROUTES.CATALOG()];
        }

        const recursive = (catalogCategory: CatalogCategoryModel): typeof breadcrumbs => {
            breadcrumbs = [
                ROUTES.CATALOG(catalogCategory.slug, catalogCategory.name),
                ...breadcrumbs
            ];
            if (!catalogCategory.catalogCategoryId) {
                return [
                    ROUTES.CATALOG(),
                    ...breadcrumbs
                ];
            }
            const parent = this.catalogCategoryById[catalogCategory.catalogCategoryId] ?? null;
            if (!parent) {
                return [
                    ROUTES.CATALOG(),
                    ...breadcrumbs
                ];
            }

            return recursive(parent);
        }

        return recursive(catalogCategory);
    }
})
