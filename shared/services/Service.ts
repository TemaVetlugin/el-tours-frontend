import {
    CompilationModel,
    CompilationModelInterface,
    HeaderMenuItemModel,
    HeaderMenuItemModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";
import { makeAutoObservable, runInAction, set } from "mobx";

type BootType = {
    headerMenu: HeaderMenuItemModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[]
}
export class Service<T> {
    set = (key: string, value: any) => {
        runInAction(() => {
        })
    }
}
