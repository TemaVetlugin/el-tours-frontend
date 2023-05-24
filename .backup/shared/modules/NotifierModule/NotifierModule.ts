import { action, makeAutoObservable } from "mobx";

type OptionsType = {
    description?: string,
    successLabel?: string,
    cancelLabel?: string,
}

export const NotifierModule = new class {
    isOpened = false;
    title = 'Уведомление';
    description = 'Описание';
    type: 'alert' | 'prompt' = 'alert'
    successLabel = 'Хорошо';
    cancelLabel = 'Отменить';
    success = () => {
    };
    cancel = () => {
    };

    constructor() {
        makeAutoObservable(this, {
            alert: action,
            prompt: action,
            hide: action,
        });
    }

    hide = () => {
        this.isOpened = false;
    }

    alert = (title: string, { description, successLabel }: OptionsType = {}): Promise<boolean> => {
        this.description = description || '';
        this.successLabel = successLabel || 'Хорошо';
        this.isOpened = true;
        this.title = title;
        this.type = 'alert';
        return new Promise((resolve) => {
            this.success = () => {
                this.hide();
                resolve(true);
            }
        })
    }

    prompt = (title: string, { description, successLabel, cancelLabel }: OptionsType = {}): Promise<boolean> => {
        this.description = description || '';
        this.successLabel = successLabel || 'Принять';
        this.cancelLabel = cancelLabel || 'Отменить';
        this.type = 'prompt';
        this.title = title;
        this.isOpened = true;
        return new Promise((resolve) => {
            this.success = () => resolve(true);
            this.cancel = () => resolve(false);
        })
    }
}
