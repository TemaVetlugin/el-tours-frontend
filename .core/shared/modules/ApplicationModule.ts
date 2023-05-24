import { makeAutoObservable } from "mobx";

import { ContentResourceModel, HeaderSearchPromptModel, HeaderMenuItemModel, FooterMenuItemModel } from "shared/models";
import { ApplicationDataType } from "shared/types";

export const ApplicationModule = new class {
    contentResources: ContentResourceModel[] = [];
    headerSearchPrompts: HeaderSearchPromptModel[] = [];
    headerMenuItems: HeaderMenuItemModel[] = [];
    footerMenuItems: FooterMenuItemModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    mount = ({contentResources, headerSearchPrompts, headerMenuItems, footerMenuItems}: ApplicationDataType) => {
        this.contentResources = contentResources.map(item => new ContentResourceModel(item));
        this.headerSearchPrompts = headerSearchPrompts.map(item => new HeaderSearchPromptModel(item));
        this.headerMenuItems = headerMenuItems.map(item => new HeaderMenuItemModel(item));
        this.footerMenuItems = footerMenuItems.map(item => new FooterMenuItemModel(item));
    }
}
