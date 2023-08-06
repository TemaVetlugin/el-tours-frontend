import { makeAutoObservable } from "mobx";

import {
    FooterMenuItemModel, FooterMenuItemModelInterface,
    HeaderMenuItemModel,
    HeaderMenuItemModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";

import { makeService } from "shared/services/utilities/makeService";

type BootType = {
    headerMenuItems: HeaderMenuItemModelInterface[],
    footerMenuItems: FooterMenuItemModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
}
export const LayoutService = makeService(class {
    headerMenuItems: HeaderMenuItemModel[] = [];
    footerMenuItems: FooterMenuItemModel[] = [];
    searchPrompts: SearchPromptModel[] = [];

    headerIsMinified = false;
    loginIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, headerMenuItems, footerMenuItems }: BootType) => {
        this.headerMenuItems = headerMenuItems.map(item => new HeaderMenuItemModel(item));
        this.footerMenuItems = footerMenuItems.map(item => new FooterMenuItemModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
    }
});
