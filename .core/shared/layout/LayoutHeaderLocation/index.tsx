import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import { useIsInitialized, useMedia, useObservable, useOnClickOutside } from "shared/hooks";
import { UserModule } from "shared/modules";
import { UiBoundary, UiButton, UiIcon, UiStickerCircle } from "shared/uikit";

import { CityModel } from "shared/models";
import { Geolocation } from "shared/utilities";
import { citiesLocateRequest, citiesRequest, citiesSetRequest } from "shared/requests/api";
import { COLORS, MEDIA_POINTS } from "shared/contants";

import icon from './assets/icon.svg';

import './index.scss';

export const LayoutHeaderLocation = observer(() => {
    const store = useObservable({
        cityGuess: null as CityModel | null,
        isOpened: false,
        isLoading: false,
        isError: false,
        cities: [] as CityModel[],
    });

    const ref = useRef<HTMLDivElement>(null);
    const isInitialized = useIsInitialized();
    const { is360, is768 } = useMedia();

    useEffect(() => {
        if (store.isOpened && store.cities.length === 0) {
            (async () => {
                store.set("isLoading", true);
                const { isSuccess, data } = await citiesRequest();
                if (isSuccess && data) {
                    store.set("cities", data.items.map(item => new CityModel(item)));
                }
                store.set("isError", !(isSuccess && data))
                store.set("isLoading", false);
            })();
        }
    }, [store.isOpened]);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        (async () => {
            if (!UserModule.user.cityConfirmed) {
                const coords = await Geolocation.getPosition();
                const { data, isSuccess } = await citiesLocateRequest(coords ? {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                } : {});
                if (isSuccess && data) {
                    store.set("cityGuess", new CityModel(data.item));
                }
            }
        })();
    }, [isInitialized])

    useOnClickOutside(ref, () => {
        if (store.isOpened && !store.cityGuess) {
            store.set("isOpened", false);
        }
    });

    const { value: markerSize } = useMedia({
        [MEDIA_POINTS.IS_360]: 32,
        [MEDIA_POINTS.IS_1024]: 24,
    });

    const handleConfirm = async () => {
        if (store.cityGuess) {
            await citiesSetRequest({ id: store.cityGuess.id });
            UserModule.user.update({
                city: store.cityGuess,
                cityConfirmed: true,
            });
        }
        store.set("cityGuess", null);
    }

    const handleSelect = async (city: CityModel) => {
        await citiesSetRequest({ id: city.id });
        UserModule.user.update({
            city: city,
            cityConfirmed: true,
        });
        store.set("cityGuess", null);
        store.set("isOpened", false);
    }

    const cityName = () => {
        if (!UserModule.user.cityConfirmed) {
            if (!store.cityGuess) {
                return 'Определение...';
            }
            return store.cityGuess.name;
        }
        return UserModule.user.city.name
    };

    return (
        <div className="layout-header-location" ref={ref}>
            <div className="layout-header-location-control" onClick={() => store.set("isOpened", !store.isOpened)}>
                <div
                    className="layout-header-location-control__marker"
                    style={{ backgroundImage: `url(${icon.src})` }}
                />
                <div className="layout-header-location-control__name">{cityName()}</div>
                <div className="layout-header-location-control__chevron">
                    <UiIcon name="chevronDown" size={8}/>
                </div>
            </div>
            {store.isOpened && (
                <div className="layout-header-location-list">
                    <div className="layout-header-location-list__header">Выберите город</div>
                    <UiBoundary isError={store.isError} isLoading={store.isLoading} style={{ height: 80 }}>
                        <div className='layout-header-location-list__items'>
                            {store.cities.map(city => (
                                <div key={city.id} className="layout-header-location-list__item"
                                     onClick={() => handleSelect(city)}>
                                    {city.name}
                                </div>
                            ))}
                        </div>
                    </UiBoundary>
                </div>
            )}
            {!store.isOpened && store.cityGuess && (
                <div className="layout-header-location-guess">
                    <div className="layout-header-location-guess__preview">
                        <UiStickerCircle size={102} color={COLORS.PRIMARY2}>
                            <UiIcon name="geoMarkerGradient" size={56}/>
                        </UiStickerCircle>
                    </div>
                    <div className="layout-header-location-guess__description">
                        <span>Ваш город </span>
                        <div className="layout-header-location-guess__name">{store.cityGuess.name}?</div>
                    </div>
                    <div className="layout-header-location-guess__footer">
                        <UiButton
                            onClick={handleConfirm}
                            style={{ width: 202 }}
                            label='ВСЁ ВЕРНО'
                            colors={{
                                button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}
                        />
                        <UiButton
                            onClick={() => store.set("isOpened", true)}
                            style={{ width: 142, padding: 0 }}
                            label='ВЫБРАТЬ ГОРОД'
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                label: [COLORS.PRIMARY, COLORS.SECONDARY],
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
});
