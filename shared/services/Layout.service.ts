import {
    CompilationModel,
    CompilationModelInterface,
    HeaderMenuModel,
    HeaderMenuModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";
import { makeAutoObservable } from "mobx";

type BootType = {
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[]
}
export const LayoutService = new class {
    headerMenu: HeaderMenuModel[] = [];
    searchPrompts: SearchPromptModel[] = [];
    compilations: CompilationModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    boot = ({ searchPrompts, compilations, headerMenu }: BootType) => {
        this.headerMenu = headerMenu.map(item => new HeaderMenuModel(item));
        this.searchPrompts = searchPrompts.map(item => new SearchPromptModel(item));
        this.compilations = compilations.map(item => new CompilationModel(item));
    }
}
