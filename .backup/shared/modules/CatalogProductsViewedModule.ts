import { makeAutoObservable } from "mobx";

import { CatalogProductModel } from "shared/models";
import { Cache, lodash } from "shared/utilities";

export const CatalogProductsViewedModule = new class {
    catalogProducts: CatalogProductModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    keys = async () => {
        let keys = await Cache.get<number[], number[]>('catalogProducts.viewed', []);
        if (!Array.isArray(keys)) {
            keys = [];
        }

        return keys;
    }

    add = async (catalogProductId: number) => {
        let keys = await this.keys();
        Cache.set('catalogProducts.viewed', lodash.uniq([catalogProductId, ...keys]).slice(0, 18));
    }

    fetch = async () => {

    }
}
