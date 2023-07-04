'use client';

import React, { useEffect } from "react";
import { enableStaticRendering } from "mobx-react-lite";

import { CatalogService, ContentResourceService, LayoutService, LocationService } from "shared/services";
import { bootQuery } from "shared/queries/frontend/boot.query";
import { UserService } from "shared/services/User.service";
import { ReturnType } from "shared/types";

enableStaticRendering(typeof window === "undefined");

type PropsType = {
    cityId: number | string | null,
} & NonNullable<ReturnType<typeof bootQuery>['data']>;

export const Boot = (
    {
        cities,
        regions,
        cityId,
        searchPrompts,
        catalogCategories,
        compilations,
        headerMenu,
        contentResources
    }: PropsType
) => {
    ContentResourceService.boot({ contentResources });
    LocationService.boot({ cities, cityId, regions });
    CatalogService.boot({ catalogCategories, compilations });
    LayoutService.boot({ searchPrompts, headerMenu });

    useEffect(() => {
        UserService.boot();
    }, []);

    // render fix
    return (
        <div className='boot'/>
    );
};
