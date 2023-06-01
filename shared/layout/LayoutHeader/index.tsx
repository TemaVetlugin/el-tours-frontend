import React from "react";
import Link from "next/link";

import { UiButton, UiIcon, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";

import { LayoutHeaderCity } from "../LayoutHeaderCity";
import { LayoutHeaderMenuPrimary } from "../LayoutHeaderMenuPrimary";
import { LayoutHeaderMenuSecondary } from "../LayoutHeaderMenuSecondary";
import { LayoutHeaderCatalog } from "../LayoutHeaderCatalog";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";

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
            <UiWrap>
                <div className="layout-header__main">
                    <Link href={ROUTES.HOME()} className="layout-header__logo"/>
                    <div className="layout-header__catalog">
                        <UiButton>
                            <UiIcon size={24} name={"catalogMenu"}/>
                            <span>Каталог</span>
                        </UiButton>
                    </div>
                    <LayoutHeaderSearch/>
                </div>
            </UiWrap>
            <LayoutHeaderCatalog/>
        </div>
    );
};