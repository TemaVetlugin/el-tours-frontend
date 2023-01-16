import { makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IContentPageModel {
	id?: number;
	name?: string;
	content?: string;
	imageThumbnail?: string;
	imagesThumbnails?: string[];
}

export class ContentPageModel extends Model<IContentPageModel> implements IContentPageModel {
    fillable: Array<keyof IContentPageModel> = [
		"id",
		"name",
		"content",
		"imageThumbnail",
		"imagesThumbnails"
    ];

	id = 0;
	name = '';
	content = '';
	imageThumbnail = '';
    imagesThumbnails = [];

    constructor(payload?: IContentPageModel) {
        super();

        makeObservable(this, {
			id: observable,
			name: observable,
			content: observable,
			imageThumbnail: observable,
            imagesThumbnails: observable
        });

        this.update(payload);
    }
}
