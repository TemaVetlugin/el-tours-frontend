'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";
import { CityService } from "shared/services";

import './index.scss';

export const LayoutHeaderCity = observer(() => {
    return (
        <div className="layout-header-city">
            <div className="layout-header-city__name">
                {CityService.city.name}
            </div>
            <UiIcon
                size={16}
                name={'chevronDown'}
                color={COLORS._007C81}
            />
        </div>
    );
});
