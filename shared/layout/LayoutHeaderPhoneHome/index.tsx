'use client';

import {observer} from "mobx-react-lite";
import React from "react";
import {COLORS} from "shared/contants";

import {UiButton, UiIcon} from "shared/ui";

import './index.scss';

export const LayoutHeaderPhoneHome = observer(() => {


    return (
        <>
            <div className="layout-header-phone">
            <UiButton  colors={{
                button: [COLORS.TRANSPARENT, COLORS.WHITE],
                border: [COLORS.WHITE, COLORS.WHITE],
                label: [COLORS.WHITE, COLORS.BLACK],
                icon: [COLORS.WHITE, COLORS.BLACK],
            }}>
                <UiIcon
                    size={24}
                    name={ "phone"}
                />
                <span>+7 (383) 202-57-00</span>
            </UiButton>
                </div>

        </>
    );
});
