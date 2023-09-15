import { makeAutoObservable } from "mobx";

import { ROUTES } from "shared/contants";
import { CatalogCategoryModel, CompilationModel } from "shared/models";
import { bootQuery } from "shared/queries/frontend";
import { catalogProductViewSaveQuery } from "shared/queries/main/catalogProductViewSave.query";
import { ReturnType } from "shared/types";
import { lodash } from "shared/utilities";
import { Cache } from "shared/utilities/client";

import { makeService } from "./utilities/makeService";

export const CatalogService = makeService(class {
    catalogCategories: CatalogCategoryModel[] = [];
    compilations: CompilationModel[] = [];
    filterIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = (data: ReturnType<typeof bootQuery>['data']) => {
        if (data?.catalogCategories) {
            this.catalogCategories = data.catalogCategories.map(item => new CatalogCategoryModel(item));
        }
        if (data?.compilations) {
            this.compilations = data.compilations.map(item => new CompilationModel(item));
        }
    }

    get catalogCategoryById() {
        return lodash.keyBy(this.catalogCategories, 'id');
    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, 'catalogCategoryId');
    }

    getViews = async () => {
        let keys = await Cache.get<number[]>('CatalogService.views');
        if (!Array.isArray(keys)) {
            keys = [];
        }

        return keys;
    }

    view = async (catalogProductId: number, cityId: number) => {
        let keys = await this.getViews();
        Cache.set('CatalogService.views', lodash.uniq([catalogProductId, ...keys]).slice(0, 18));
        catalogProductViewSaveQuery({
            catalogProductId,
            cityId
        });
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
