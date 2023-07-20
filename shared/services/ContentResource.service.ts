import { makeAutoObservable } from "mobx";

import { ContentResourceModel, ContentResourceModelInterface } from "shared/models";

import { makeService } from "shared/services/utilities/makeService";

type BootType = {
    contentResources: ContentResourceModelInterface[],
}
export const ContentResourceService = makeService(class {
    contentResources: ContentResourceModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ contentResources }: BootType) => {
        this.contentResources = contentResources.map(item => new ContentResourceModel(item));
    }

    get = (code: string, cityId: number) => {
        return this.contentResources.find(contentResource => {
            return contentResource.code === code &&
                (contentResource.cities.some(city => {
                    return city.id === cityId
                }) || contentResource.contentResourceCities.length === 0);
        }) || null
    }
});
