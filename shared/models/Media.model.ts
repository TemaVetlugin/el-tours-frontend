import { filesize } from "filesize";
import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface MediaModelInterface {
    id?: number;
    size?: number;
    originalUrl?: string;
    fileName?: string;
}

export class MediaModel extends Model<MediaModelInterface> implements MediaModelInterface {
    fillable: Array<keyof MediaModelInterface> = [
        "id",
        "size",
        "originalUrl",
        "fileName"
    ];

    id = 0;
    size = 0;
    originalUrl = '';
    fileName = '';

    constructor(payload?: MediaModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            size: observable,
            originalUrl: observable,
            fileName: observable,
            sizeFormatted: computed,
            extension: computed
        });

        this.update(payload);
    }


    get sizeFormatted(): string {
        return filesize(this.size, {
            base: 2,
            standard: "jedec",
            locale: 'ru'
        }) as string;
    }

    get extension() {
        return this.originalUrl.split('.').slice(-1)[0];
    }
}
