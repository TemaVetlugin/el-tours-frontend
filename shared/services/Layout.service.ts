import { makeAutoObservable } from "mobx";

import {
    HeaderMenuItemModel,
    HeaderMenuItemModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";

import { makeService } from "shared/services/utilities/makeService";

type BootType = {
    headerMenuItems: HeaderMenuItemModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
}
export const LayoutService = makeService(class {
    headerMenuItems: HeaderMenuItemModel[] = [];
    searchPrompts: SearchPromptModel[] = [];

    loginIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, headerMenuItems }: BootType) => {
        this.headerMenuItems = headerMenuItems.map(item => new HeaderMenuItemModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
    }
});
