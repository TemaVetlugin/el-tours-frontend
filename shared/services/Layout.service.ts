import { makeAutoObservable } from "mobx";

import {
    CompilationModelInterface,
    HeaderMenuModel,
    HeaderMenuModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";

import { makeService } from "shared/services/utilities/makeService";

type BootType = {
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
}
export const LayoutService = makeService(class {
    headerMenu: HeaderMenuModel[] = [];
    searchPrompts: SearchPromptModel[] = [];

    loginIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, headerMenu }: BootType) => {
        this.headerMenu = headerMenu.map(item => new HeaderMenuModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
    }
});
