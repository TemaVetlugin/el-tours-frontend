import { makeAutoObservable } from "mobx";

import { CatalogCategoryModel, CatalogCategoryModelInterface, CompilationModel, CompilationModelInterface } from "shared/models";
import { lodash } from "shared/utilities";

import { makeService } from "./utilities/makeService";
import { ROUTES } from "shared/contants";
import { ReturnType } from "shared/types";
import { Cache } from "shared/utilities/client";

type BootType = {
    catalogCategories?: CatalogCategoryModelInterface[],
    compilations?: CompilationModelInterface[]
}

export const CatalogService = makeService(class {
    catalogCategories: CatalogCategoryModel[] = [];
    compilations: CompilationModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ catalogCategories, compilations }: BootType) => {
        if (catalogCategories) {
            this.catalogCategories = catalogCategories.map(item => new CatalogCategoryModel(item));
        }
        if (compilations) {
            this.compilations = compilations.map(item => new CompilationModel(item));
        }
    }

    get catalogCategoryById() {
        return lodash.keyBy(this.catalogCategories, 'id');
    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, 'catalogCategoryId');
    }

    getViews = async () => {
        let keys = await Cache.get<number[]>('CatalogModule.views');
        if (!Array.isArray(keys)) {
            keys = [];
        }

        return keys;
    }

    addView = async (catalogProductId: number) => {
        let keys = await this.getViews();
        Cache.set('CatalogModule.views', lodash.uniq([catalogProductId, ...keys]).slice(0, 18));
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
