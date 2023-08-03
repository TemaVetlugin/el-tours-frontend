'use client';

import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { COLORS } from "shared/contants";
import { useAsyncEffect, useObservable, useOnClickOutside, useUser } from "shared/hooks";
import { CityModel } from "shared/models";
import { citiesLocateQuery, usersUpdateQuery } from "shared/queries/main";
import { LocationService } from "shared/services";

import { UiButton, UiIcon } from "shared/ui";
import { geolocation } from "shared/utilities";

import './index.scss';

export const LayoutHeaderLocation = observer(() => {
    const popup = useRef<HTMLDivElement>(null)
    const user = useUser();
    const store = useObservable({
        isOpened: false,
        cityGuess: null as CityModel | null,
        isGuessing: false
    });

    useAsyncEffect(async () => {
        if (user.cityConfirmed || !user.isInitialized) {
            return;
        }
        const geo = await geolocation();
        const { isSuccess, data } = await citiesLocateQuery({
            latitude: geo?.latitude || null,
            longitude: geo?.longitude || null,
        });
        if (isSuccess && data) {
            store.set("cityGuess", new CityModel(data.item));
            store.set("isGuessing", true);
        }
    }, [user]);

    useOnClickOutside(popup, () => {
        store.set("isOpened", false);
    });

    const handleGuessAccept = () => {
        store.set("isGuessing", false);
        if (store.cityGuess) {
            confirmCity(store.cityGuess.id);
        }
    }

    const confirmCity = (cityId: number) => {
        LocationService.setCity(cityId);
        usersUpdateQuery({
            cityId,
            cityConfirmed: true
        });
    }

    const handleGuessCancel = () => {
        store.set("isGuessing", false);
        store.set("isOpened", true);
    }

    const handleSelect = (cityId: number) => {
        confirmCity(cityId);
        store.set("isOpened", false);
    }

    return (
        <div className="layout-header-location">
            <div
                className="layout-header-location__inner"
                onClick={() => {
                    store.set("isOpened", !store.isOpened)
                    store.set("isGuessing", false);
                }}
            >
                <div className="layout-header-location__name underwave">
                    {LocationService.city.name}
                </div>
                <UiIcon
                    size={16}
                    name={'chevronDown'}
                    color={COLORS.GREEN_PRIMARY}
                />
            </div>
            {(store.isGuessing && store.cityGuess) && (
                <div className="layout-header-location-guess">
                    <div className="layout-header-location-guess__title">Мы верно определили ваш город?</div>
                    <div className="layout-header-location-guess__city">{store.cityGuess.name}</div>
                    <div className="layout-header-location-guess__actions">
                        <UiButton
                            label={'Да'}
                            size={"small"}
                            onClick={handleGuessAccept}
                        />
                        <UiButton
                            label={'Нет'}
                            size={"small"}
                            onClick={handleGuessCancel}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.GREEN_SECONDARY],
                                label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                                border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            }}
                        />
                    </div>
                </div>
            )}
            {store.isOpened && (
                <div className="layout-header-location-popup" ref={popup}>
                    <div className="layout-header-location-popup__title">Выбор города</div>
                    <div
                        className="layout-header-location-popup__close"
                        onClick={() => store.set("isOpened", false)}
                    >
                        <UiIcon size={16} name={'close'} color={COLORS.GRAY_PRIMARY}/>
                    </div>
                    <div className="layout-header-location__regions">
                        {LocationService.regions.map(region => (
                            <div key={region.id} className="layout-header-location-popup-region">
                                <div
                                    className="layout-header-location-popup-region__header"
                                    onClick={() => {
                                        LocationService.regions.forEach(item => {
                                            item.update({ isOpened: item.id === region.id });
                                        })
                                    }}
                                >
                                    <div className="layout-header-location-popup-region__name">{region.name}</div>
                                    <UiIcon
                                        size={16}
                                        name={region.isOpened ? 'chevronUp' : 'chevronDown'}
                                        color={COLORS.GRAY_PRIMARY}
                                    />
                                </div>
                                {region.isOpened && (
                                    <div className='layout-header-location-popup-region__cities'>
                                        {LocationService.citiesByRegionId[region.id]?.map(city => (
                                            <div
                                                key={city.id}
                                                className={'layout-header-location-popup-region__city'}
                                                onClick={() => {
                                                    handleSelect(city.id);
                                                }}
                                            >
                                                <span>{city.name}</span>
                                                {city.id === LocationService.city.id && (
                                                    <UiIcon size={16} name={'check'} color={COLORS.GREEN_PRIMARY}/>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});
