import { makeAutoObservable, observable, runInAction } from "mobx";

export const Notifier = new class {
    data = {
        alert: {
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
                console.log(123)
                this.data.alert.message = message;
                this.data.alert.isOpened = true;
                this.data.alert.resolve = (value: boolean) => {
                    runInAction(() => {
                        this.data.alert.isOpened = false;
                    })
                    resolve(value);
                };

                console.log(this.data.alert.isOpened);
            })
        });
    }
}
