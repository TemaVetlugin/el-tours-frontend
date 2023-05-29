import React from "react";

import { UiWrap } from "shared/ui";

import { LayoutHeaderCity } from "../LayoutHeaderCity";
import { LayoutHeaderMenuPrimary } from "../LayoutHeaderMenuPrimary";
import { LayoutHeaderMenuSecondary } from "../LayoutHeaderMenuSecondary";

import './index.scss';
export const LayoutHeader = () => {
    return (
        <div className='layout-header'>
            <UiWrap>
                <div className="layout-header__top">
                    <LayoutHeaderCity/>
                    <LayoutHeaderMenuPrimary/>
                    <LayoutHeaderMenuSecondary/>
                </div>
            </UiWrap>
        </div>
    );
};
