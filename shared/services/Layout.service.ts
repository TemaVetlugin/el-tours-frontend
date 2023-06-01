import {
    CompilationModel,
    CompilationModelInterface,
    HeaderMenuModel,
    HeaderMenuModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";
import { makeAutoObservable } from "mobx";
import { makeService } from "shared/services/utilities/makeService";

type BootType = {
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[]
}
export const LayoutService = makeService(class {
    headerMenu: HeaderMenuModel[] = [];
    searchPrompts: SearchPromptModel[] = [];
    compilations: CompilationModel[] = [];

    loginIsOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, compilations, headerMenu }: BootType) => {
        this.headerMenu = headerMenu.map(item => new HeaderMenuModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
        this.compilations = compilations.map(item => new CompilationModel(item));
    }
});
