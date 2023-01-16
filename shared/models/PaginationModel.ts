import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IPaginationModel {
    page?: number;
    total?: number;
    pages?: number;
}

export class PaginationModel extends Model<IPaginationModel> implements IPaginationModel {
    fillable: Array<keyof IPaginationModel> = [
        "page",
        "total",
        "pages"
    ];

    page = 1;
    total = 0;
    pages = 0;

    constructor(payload?: IPaginationModel) {
        super();

        makeObservable(this, {
            page: observable,
            total: observable,
            pages: observable,
            items: computed,
        });

        this.update(payload);
    }

    get items() {
        const treshold = 1;

        const pages: { id: number | string, name: number | string }[] = [];
        if (this.pages < 9) {
            for (let i = 1; i <= this.pages; i++) {
                pages.push({
                    id: i,
                    name: i
                });
            }
        } else {
            if (this.page < 6) {
                for (let i = 1; i <= Math.max(this.page + 1, treshold + 1); i++) {
                    pages.push({ id: i, name: i });
                }
                pages.push({ id: Math.ceil(this.page + this.pages) / 2, name: '...' });
                for (let i = this.pages - treshold; i <= this.pages; i++) {
                    pages.push({ id: i, name: i });
                }
            } else if (this.page > this.pages - 5) {
                pages.push({ id: 1, name: 1 });
                pages.push({ id: 2, name: 2 });
                pages.push({ id: Math.ceil((this.page + 1) / 2), name: '...' });
                for (let i = Math.min(this.page - 1, this.pages - treshold); i <= this.pages; i++) {
                    pages.push({ id: i, name: i });
                }
            } else {
                pages.push({ id: 1, name: 1 });
                pages.push({ id: 2, name: 2 });
                pages.push({ id: Math.ceil((this.page + 1) / 2), name: '...' });
                for (let i = this.page - 1; i <= this.page + 1; i++) {
                    pages.push({ id: i, name: i });
                }
                pages.push({ id: Math.ceil((this.page + this.pages) / 2), name: '...' });
                for (let i = this.pages - treshold; i <= this.pages; i++) {
                    pages.push({ id: i, name: i });
                }
            }
        }

        return pages;
    }
}
