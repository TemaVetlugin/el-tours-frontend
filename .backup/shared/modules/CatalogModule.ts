import { action, computed, makeAutoObservable } from "mobx";

import { CatalogCategoryModel, ICatalogCategoryModel } from "shared/models";
import { Cache, lodash } from "shared/utilities";
import { catalogProductsFavoriteRequest } from "shared/requests/api";

type MountOptionsType = {
    catalogCategories: ICatalogCategoryModel[],
    favorite: number[]
}

export const CatalogModule = new class {
    catalogCategories: CatalogCategoryModel[] = [];
    favorite: number[] = [];

    constructor() {
        makeAutoObservable(this, {
            mount: action,
            catalogCategoryBySlug: computed,
            catalogCategoriesByCatalogCategoryId: computed,
        });
    }

    mount = ({ catalogCategories, favorite }: MountOptionsType) => {
        this.catalogCategories = catalogCategories.map(catalogCategory => new CatalogCategoryModel(catalogCategory));
        this.favorite = favorite;
    }

    get catalogCategoryBySlug() {
        return lodash.keyBy(this.catalogCategories, (item) => {
            return item.slug || 0
        })
    }

    get catalogCategoriesByCatalogCategoryId() {
        return lodash.groupBy(this.catalogCategories, (item) => {
            return item.catalogCategoryId || 0
        })
    }

    getViews = async () => {
        let keys = await Cache.get<number[], number[]>('CatalogModule.views', []);
        if (!Array.isArray(keys)) {
            keys = [];
        }

        return keys;
    }

    addView = async (catalogProductId: number) => {
        let keys = await this.getViews();
        Cache.set('CatalogModule.views', lodash.uniq([catalogProductId, ...keys]).slice(0, 18));
    }

    setFavorite = (catalogProductsKeys: number[]) => {
        this.favorite = catalogProductsKeys;
    }

    toggleFavorite = async (catalogProductId: number) => {
        const { isSuccess, data } = await catalogProductsFavoriteRequest({
            id: catalogProductId
        });
        if (isSuccess && data) {
            this.setFavorite(data.items);
        }
    }

    isFavorite = (catalogProductId: number) => {
        return CatalogModule.favorite.includes(catalogProductId);
    }
}
