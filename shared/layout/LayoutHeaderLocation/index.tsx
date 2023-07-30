'use client';

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import { UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";
import { LocationService, UserService } from "shared/services";
import { useAsyncEffect, useObservable, useOnClickOutside, useUser } from "shared/hooks";
import { geolocation } from "shared/utilities";
import { usersUpdateQuery } from "shared/queries/main";

import './index.scss';

export const LayoutHeaderLocation = observer(() => {
    const popup = useRef<HTMLDivElement>(null)
    const user = useUser();
    const store = useObservable({
        isOpened: false
    });

    useAsyncEffect(async () => {
        if (user.cityConfirmed) {
            return;
        }
        const data = await geolocation();
    }, [user]);

    useOnClickOutside(popup, () => {
        store.set("isOpened", false);
    })

    const handleSelect = (cityId: number) => {
        LocationService.setCity(cityId);
        usersUpdateQuery({
            cityId: cityId,
            cityConfirmed: true
        });
        store.set("isOpened", false);
    }

    return (
        <div className="layout-header-location">
            <div
                className="layout-header-location__inner"
                onClick={() => store.set("isOpened", !store.isOpened)}
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
