import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface ContentPageModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

export class ContentPageModel extends Model<ContentPageModelInterface> implements ContentPageModelInterface {
    fillable: Array<keyof ContentPageModelInterface> = [
        "id",
        "name",
        "slug",
        "content",
        "seoTitle",
        "seoDescription",
        "seoKeywords",
    ];

    id = 0;
    name = '';
    slug = '';
    content = '';
    seoTitle = '';
    seoDescription = '';
    seoKeywords = '';

    constructor(payload?: ContentPageModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            content: observable,
            seoTitle: observable,
            seoDescription: observable,
            seoKeywords: observable,
        });

        this.update(payload);
    }
}
