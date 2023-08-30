'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect } from "react";
import {COLORS, ROUTES} from "shared/contants";
import { useStore } from "shared/hooks";
import { CatalogService } from "shared/services";

import { UiButton, UiIcon, UiLink, UiScroll, UiWrap } from "shared/ui";

import icon from './assets/icon.svg';

import './index.scss';

export const LayoutHeaderPhone = observer(() => {


    return (
            <div className="layout-header-phone">
            <UiButton  colors={{
                button: [COLORS.WHITE, COLORS.WHITE],
                border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                label: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
            }}>
                <UiIcon
                    size={24}
                    name={ "phone"}
                />
                <span>+7 (383) 202-57-00</span>
            </UiButton>
                </div>
    );
});
