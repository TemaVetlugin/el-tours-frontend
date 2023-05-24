import { computed, makeObservable, observable } from "mobx";

import { Model } from "./Model";

export interface IFeedbackModel {
    id?: number;
    href?: string;
    date?: string;
    isLocal?: boolean;
    description?: string;
    username?: string;
}

export class FeedbackModel extends Model<IFeedbackModel> implements IFeedbackModel {
    fillable: Array<keyof IFeedbackModel> = [
        "id",
        "href",
        "date",
        "isLocal",
        "description",
        "username"
    ];

    id = 0;
    href = '';
    date = '';
    isLocal = false;
    description = '';
    username = '';

    constructor(payload?: IFeedbackModel) {
        super();

        makeObservable(this, {
            id: observable,
            href: observable,
            date: observable,
            isLocal: observable,
            description: observable,
            username: observable,
            iconName: computed
        });

        this.update(payload);
    }

    get iconName() {
        if (this.href.includes('flamp')) {
            return 'flamp';
        }
        return null;
    }
}
