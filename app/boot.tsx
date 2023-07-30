'use client';

import React, { useEffect } from "react";
import { enableStaticRendering } from "mobx-react-lite";

import { CatalogService, ContentResourceService, LayoutService, LocationService } from "shared/services";
import { bootQuery } from "shared/queries/frontend/boot.query";
import { UserService } from "shared/services/User.service";
import { ReturnType } from "shared/types";
import { useCity, useDidUpdateEffect } from "shared/hooks";

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
        contentResources
    }: PropsType
) => {
    ContentResourceService.boot({ contentResources });
    LocationService.boot({ cities, cityId, regions });
    CatalogService.boot({ catalogCategories, compilations });
    LayoutService.boot({ searchPrompts, headerMenuItems });

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
