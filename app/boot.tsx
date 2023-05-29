'use client';

import React, { useEffect } from "react";
import { enableStaticRendering } from "mobx-react-lite";

import { CatalogService, CityService, LayoutService } from "shared/services";
import { ResponseType } from "shared/queries/frontend/boot.query";
import { UserService } from "shared/services/User.service";
import { useReaction } from "shared/hooks/useReaction";

enableStaticRendering(typeof window === "undefined");

type PropsType = {
    cityId: number | string | null,
} & ResponseType;

export const Boot = (
    {
        cities,
        cityId,
        searchPrompts,
        catalogCategories,
        compilations,
        headerMenu
    }: PropsType
) => {
    CityService.boot({ cities, cityId });
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
