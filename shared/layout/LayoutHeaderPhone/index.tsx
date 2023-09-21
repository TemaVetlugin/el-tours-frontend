'use client';

import {observer} from "mobx-react-lite";
import React from "react";
import {COLORS} from "shared/contants";

import {UiButton, UiIcon} from "shared/ui";

import './index.scss';


type PropsType = {
    template?: 'home'|'default'

}
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
