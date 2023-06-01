import {
    CompilationModel,
    CompilationModelInterface,
    HeaderMenuModel,
    HeaderMenuModelInterface,
    SearchPromptModel,
    SearchPromptModelInterface
} from "shared/models";
import { makeAutoObservable, runInAction, set } from "mobx";

type BootType = {
    headerMenu: HeaderMenuModelInterface[],
    searchPrompts: SearchPromptModelInterface[],
    compilations: CompilationModelInterface[]
}
export class Service<T> {
    set = (key: string, value: any) => {
        runInAction(() => {
        })
    }
}
