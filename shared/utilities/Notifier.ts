import { makeAutoObservable, observable, runInAction } from "mobx";

export const Notifier = new class {
    data = {
        alert: {
            resolve: (() => {
            }) as ((value: boolean) => void),
            message: '',
            isOpened: false,
        },
        confirm: {
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

    confirm = async (message: string) => {
        return new Promise(resolve => {
            runInAction(() => {
                this.data.confirm.message = message;
                this.data.confirm.isOpened = true;
                this.data.confirm.resolve = (value: boolean) => {
                    runInAction(() => {
                        this.data.confirm.isOpened = false;
                    })
                    resolve(value);
                };
            })
        });
    }
}
