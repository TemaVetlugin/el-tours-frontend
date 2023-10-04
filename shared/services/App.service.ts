import { makeAutoObservable } from "mobx";

import {FooterMenuItemModel, FooterMenuSectionModel, HeaderMenuItemModel, HeaderMenuSectionModel, MegaMenuItemModel, MegaMenuSectionModel, SearchPromptModel} from "shared/models";
import { bootQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";

import { makeService } from "./utilities/makeService";

export const AppService = makeService(class {
    headerMenuItems: HeaderMenuItemModel[] = [];
    headerMenuSections: HeaderMenuSectionModel[] = [];
    footerMenuItems: FooterMenuItemModel[] = [];
    footerMenuSections: FooterMenuSectionModel[] = [];
    megaMenuItems: MegaMenuItemModel[] = [];
    megaMenuSections: MegaMenuSectionModel[] = [];
    searchPrompts: SearchPromptModel[] = [];
    headerIsMinified = false;
    loginIsOpened = false;
    menuIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = (data: ReturnType<typeof bootQuery>['data']) => {
        if (data?.headerMenuItems) {
            this.headerMenuItems = data.headerMenuItems.map(item => new HeaderMenuItemModel(item));
        }
        if (data?.headerMenuSections) {
            this.headerMenuSections = data.headerMenuSections.map(item => new HeaderMenuSectionModel(item));
        }
        if (data?.footerMenuItems) {
            this.footerMenuItems = data.footerMenuItems.map(item => new FooterMenuItemModel(item));
        }
        if (data?.footerMenuSections) {
            this.footerMenuSections = data.footerMenuSections.map(item => new FooterMenuSectionModel(item));
        }
        if (data?.megaMenuItems) {
            this.megaMenuItems = data.megaMenuItems.map(item => new MegaMenuItemModel(item));

        }
        if (data?.megaMenuSections) {
            this.megaMenuSections = data.megaMenuSections.map(item => new MegaMenuSectionModel(item));

        }
        if (data?.searchPrompts) {
            this.searchPrompts = data.searchPrompts.map(item => new SearchPromptModel(item));
        }
    }
});

