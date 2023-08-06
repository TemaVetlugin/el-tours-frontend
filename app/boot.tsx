'use client';

import { enableStaticRendering } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useCity, useDidUpdateEffect } from "shared/hooks";
import { bootQuery } from "shared/queries/frontend/boot.query";

import { CatalogService, ContentResourceService, LayoutService, LocationService } from "shared/services";
import { UserService } from "shared/services/User.service";
import { ReturnType } from "shared/types";

enableStaticRendering(typeof window === "undefined");

type PropsType = {
    cityId: number,
} & NonNullable<ReturnType<typeof bootQuery>['data']>;

export const Boot = (
    {
        cities,
        regions,
        cityId,
        searchPrompts,
        catalogCategories,
        compilations,
        headerMenuItems,
        footerBanners,
        footerMenuItems,
        contentResources
    }: PropsType
) => {
    ContentResourceService.boot({ contentResources });
    LocationService.boot({ cities, cityId, regions });
    CatalogService.boot({ catalogCategories, compilations });
    LayoutService.boot({ searchPrompts, headerMenuItems, footerMenuItems, footerBanners });

    useEffect(() => {
        UserService.boot();
    }, []);

    // render fix
    return (
        <div className='boot'>
            <BootHydrate/>
        </div>
    );
};

const BootHydrate = () => {
    const city = useCity();
    useDidUpdateEffect(() => {
        (async () => {
            const { data, isSuccess } = await bootQuery({
                cityId: city.id,
                isHydrate: true
            });
            if (data && isSuccess) {
                ContentResourceService.boot(data);
                CatalogService.boot(data);
            }
        })();
    }, [city]);

    return (
        <div className='boot-hydrate'/>
    );
};
