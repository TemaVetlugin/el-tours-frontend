import { makeAutoObservable, runInAction } from "mobx";

import { YMapsType } from "shared/types";

export const YandexMapModule = new class {
    isLoading = false;
    isInitialized = false;

    callbacks: {
        [id: string]: (ymaps: YMapsType) => void
    } = {};

    constructor() {
        makeAutoObservable(this);
    }

    ymaps = (callback: (ymaps: YMapsType) => void): void => {
        if (!this.isInitialized || typeof window === undefined) {
            return;
        }
        if (callback) {
            callback((window as any).ymaps as YMapsType);
        }
    }

    private load = () => {
        const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY || null;
        const src = `//api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;

        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.onload = resolve;
            scriptElement.onerror = reject;
            scriptElement.type = 'text/javascript';
            scriptElement.src = src;
            document.body.appendChild(scriptElement);
        });
    }

    onLoad = async (id: string, callback: (ymaps: YMapsType) => void) => {
        if (this.isInitialized) {
            this.ymaps(callback);
            return;
        }
        this.callbacks[id] = callback;
        if (!this.isLoading) {
            this.isLoading = true;
            await this.load();
            (window as any).ymaps.ready(() => {
                runInAction(() => {
                    this.isLoading = false;
                    this.isInitialized = true;
                    for (const key in this.callbacks) {
                        this.ymaps(this.callbacks[key]);
                    }
                });
            })
        }
    }
}
