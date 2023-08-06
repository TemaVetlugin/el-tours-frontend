import { makeAutoObservable } from "mobx";

import {
    FooterBannerModel,
    FooterBannerModelInterface,
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
    footerBanners: FooterBannerModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
}
export const LayoutService = makeService(class {
    headerMenuItems: HeaderMenuItemModel[] = [];
    footerMenuItems: FooterMenuItemModel[] = [];
    searchPrompts: SearchPromptModel[] = [];
    footerBanners: FooterBannerModel[] = [];

    headerIsMinified = false;
    loginIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, headerMenuItems, footerMenuItems, footerBanners }: BootType) => {
        console.log(footerBanners)
        this.headerMenuItems = headerMenuItems.map(item => new HeaderMenuItemModel(item));
        this.footerMenuItems = footerMenuItems.map(item => new FooterMenuItemModel(item));
        this.footerBanners = footerBanners.map(item => new FooterBannerModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
    }
});
