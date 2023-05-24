import { action, makeAutoObservable } from "mobx";

export const LayoutModule = new class {
    isHeaderCatalogOpened = false;

    constructor() {
        makeAutoObservable(this, {
            toggleHeaderCatalog: action,
        });
    }

    toggleHeaderCatalog = (value?: boolean) => {
        if (value === undefined) {
            this.isHeaderCatalogOpened = !this.isHeaderCatalogOpened
        } else {
            this.isHeaderCatalogOpened = value;
        }
    }
}
