'use client';
import React from "react";

import { CityInterface, CityModel } from "shared/models";
import { CityService } from "shared/services";

type PropsType = {
    cityId: number | string | null,
    cities: CityInterface[]
}

export const Bootstrap = ({ cities, cityId }: PropsType) => {
    CityService.boot(cities, cityId);

    return null;
};
