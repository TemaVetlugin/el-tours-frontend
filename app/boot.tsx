'use client';

import React, { useEffect } from "react";
import { enableStaticRendering } from "mobx-react-lite";

import { CatalogService, CityService, LayoutService } from "shared/services";
import { ResponseType } from "shared/queries/frontend/boot.query";
import { UserService } from "shared/services/User.service";

enableStaticRendering(typeof window === "undefined");

type PropsType = {
    cityId: number | string | null,
} & ResponseType;

export const Boot = (
    {
        cities,
        regions,
        cityId,
        searchPrompts,
        catalogCategories,
        compilations,
        headerMenu
    }: PropsType
) => {
    CityService.boot({ cities, cityId, regions });
    CatalogService.boot({ catalogCategories });
    LayoutService.boot({ searchPrompts, compilations, headerMenu });

    useEffect(() => {
        UserService.boot();
    }, []);


    // render fix
    return (
        <div className='boot'/>
    );
};
