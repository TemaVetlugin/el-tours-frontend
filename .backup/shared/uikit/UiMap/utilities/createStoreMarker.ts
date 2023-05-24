import { StoreModel } from "shared/models";
import { ChangeHandlerType, YMapsType } from "shared/types";

type OptionsType = {
    ymaps: YMapsType,
    store: StoreModel,
    isHovered?: boolean,
    value?: number | null
    content?: (value: number) => string,
    onChange?: ChangeHandlerType<number>
}

const iconHtml = ({ store, isHovered = false }: OptionsType) => {
    let caption = '';
    if (isHovered) {
        caption = `
            <div class="ui-map-marker-icon__caption">
                <div class="ui-map-marker-icon__title">${store.name}</div>
                <div class="ui-map-marker-icon__description">${store.worktime?.replace("\\n", "\n")}</div>
            </div>
        `;
    }

    return `
        <div class="ui-map-marker-icon">
            <div class="ui-map-marker-icon__label">+</div>
            ${caption}
        </div>
    `;
}
const iconLayout = (options: OptionsType) => {
    return options.ymaps.templateLayoutFactory.createClass(iconHtml(options));
}

const balloonHtml = ({ store, value, content, onChange }: OptionsType) => {
    let contentHtml = '';
    if (content) {
        contentHtml = `<div class="ui-map-marker-balloon__inner">В наличии ${content(store.id)}</div>`;
    }

    let buttonHtml = '';
    if (onChange) {
        if (value === store.id) {
            buttonHtml = `
                <div class="ui-map-marker-balloon__button">
                    <button class="ui-button ui-button--normal ui-button--select ui-button--active" type="button">
                        <div class="ui-button__background"></div>
                        <div class="ui-button__inner">ВЫБРАНА</div>
                    </button>
                </div>
            `
        } else {
            buttonHtml = `
            <div class="ui-map-marker-balloon__button">
                <button class="ui-button ui-button--normal ui-button--select" type="button">
                    <div class="ui-button__background"></div>
                    <div class="ui-button__inner">ВЫБРАТЬ</div>
                </button>
            </div>
        `
        }
    }
    return `
        <div class="ui-map-marker-balloon">
            <div class="ui-map-marker-balloon__title">${store.name}</div>
            <div class="ui-map-marker-balloon__address">${store.address}</div>
            <div class="ui-map-marker-balloon__description">Аптека ${store.storeBrand.name}</div>
            <div class="ui-map-marker-balloon__description">${store.worktime?.replace("\\n", "\n")}</div>
            ${contentHtml}
            ${buttonHtml}
        </div>
    `;
}

const balloonLayout = (options: OptionsType) => {
    return options.ymaps.templateLayoutFactory.createClass(balloonHtml(options), {
        build: function () {
            (this as any).constructor.superclass.build.call(this);
            if (options.onChange) {
                this._element.getElementsByClassName('ui-button--select')[0].addEventListener('click', (e: any) => {
                    e.preventDefault();
                    options.onChange && options.onChange({
                        name: 'storeId',
                        value: options.store.id
                    });
                    document.getElementsByClassName(` p-checkout-store--${options.store.id}`)[0]?.scrollIntoView();
                });
            }
        },
    });
}

export const createStoreMarker = (options: OptionsType) => {
    const placemark = new options.ymaps.Placemark([options.store.latitude, options.store.longitude], {}, {
        balloonContentLayout: balloonLayout(options),
        balloonPanelMaxMapArea: 0,
        iconLayout: iconLayout(options),
        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 16
        }
    });

    const update = (value: number | null = null) => {
        placemark.options.set('balloonContentLayout', balloonLayout({
            ...options,
            value,
        }));
    }

    // show caption on hover
    placemark.events.add('mouseenter', function (e: any) {
        e.get('target').options.set('iconLayout', iconLayout({
            ...options,
            isHovered: true
        }))
    }).add('mouseleave', function (e: any) {
        e.get('target').options.set('iconLayout', iconLayout({
            ...options,
            isHovered: false
        }))
    }).add('click', function (e: any) {
        e.get('target').options.set('iconLayout', iconLayout({
            ...options,
            isHovered: false
        }))
    });

    return {
        placemark,
        update
    };
}
