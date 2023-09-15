import { makeAutoObservable } from "mobx";

import { FooterBannerModel, FooterMenuItemModel, HeaderMenuItemModel, SearchPromptModel} from "shared/models";
import { bootQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";

import { makeService } from "./utilities/makeService";

export const AppService = makeService(class {
    headerMenuItems: HeaderMenuItemModel[] = [];
    footerMenuItems: FooterMenuItemModel[] = [];
    searchPrompts: SearchPromptModel[] = [];
    footerBanners: FooterBannerModel[] = [];
    subheader = {
        new: false,
        discount: false,
        promoActions: false,
    }

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
        if (data?.footerMenuItems) {
            this.footerMenuItems = data.footerMenuItems.map(item => new FooterMenuItemModel(item));
        }
        if (data?.footerBanners) {
            this.footerBanners = data.footerBanners.map(item => new FooterBannerModel(item));
        }
        if (data?.searchPrompts) {
            this.searchPrompts = data.searchPrompts.map(item => new SearchPromptModel(item));
        }
        if (data?.subheader) {
            this.subheader = data.subheader;
        }
    }
});

