import { makeAutoObservable } from "mobx";

import { ContentResourceModel, ContentResourceModelInterface } from "shared/models";
import { bootQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";

import { makeService } from "./utilities/makeService";

type BootType = {
    contentResources: ContentResourceModelInterface[],
}
export const ContentResourceService = makeService(class {
    contentResources: ContentResourceModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = (data: ReturnType<typeof bootQuery>['data']) => {
        if(data?.contentResources) {
            this.contentResources = data.contentResources.map(item => new ContentResourceModel(item));
        }
    }

    get = (code: string, cityId: number) => {
        return this.contentResources.find(contentResource => {
            return contentResource.code === code &&
                (contentResource.cities.some(city => {
                    return city.id === cityId
                }) || contentResource.cities.length === 0);
        }) || null
    }
});

