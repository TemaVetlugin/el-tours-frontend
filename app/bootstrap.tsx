'use client';
import React from "react";

import { CityInterface, CityModel } from "shared/models";
import { CityService } from "shared/services/City.service";

type PropsType = {
    cities: CityInterface[]
}

export const Bootstrap = ({ cities }: PropsType) => {
    CityService.cities = cities.map(city => new CityModel(city));

    return null;
};
