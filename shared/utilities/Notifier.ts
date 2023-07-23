import { makeAutoObservable, observable, runInAction } from "mobx";

export const Notifier = new class {
    data = {
        alert: {
            resolve: (() => {
            }) as ((value: boolean) => void),
            message: '',
            isOpened: false,
        },
        prompt: {
            resolve: (() => {
            }) as ((value: boolean) => void),
            message: '',
            isOpened: false,
        }
    }

    constructor() {
        makeAutoObservable(this, {
            data: observable
        });
    }

    alert = async (message: string) => {
        return new Promise(resolve => {
            runInAction(() => {
                this.data.alert.message = message;
                this.data.alert.isOpened = true;
                this.data.alert.resolve = (value: boolean) => {
                    runInAction(() => {
                        this.data.alert.isOpened = false;
                    })
                    resolve(value);
                };
            })
        });
    }

    prompt = async (message: string) => {
        return new Promise(resolve => {
            runInAction(() => {
                this.data.prompt.message = message;
                this.data.prompt.isOpened = true;
                this.data.prompt.resolve = (value: boolean) => {
                    runInAction(() => {
                        this.data.prompt.isOpened = false;
                    })
                    resolve(value);
                };
            })
        });
    }
}
