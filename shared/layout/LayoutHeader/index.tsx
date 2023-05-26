import React from "react";

import { LayoutHeaderCity } from "../LayoutHeaderCity";
import { UiWrap } from "shared/ui";

import { LayoutHeaderMenuPrimary } from "shared/layout/LayoutHeaderMenuPrimary";
import { HeaderMenuModelInterface } from "shared/models";
import { HeaderMenuTypeEnum } from "shared/enums";

import './index.scss';
import { LayoutHeaderMenuSecondary } from "shared/layout/LayoutHeaderMenuSecondary";

type PropsType = {
    headerMenu: HeaderMenuModelInterface[]
}
export const LayoutHeader = ({ headerMenu }: PropsType) => {
    console.log(headerMenu)
    return (
        <div className='layout-header'>
            <UiWrap>
                <div className="layout-header__top">
                    <LayoutHeaderCity/>
                    <LayoutHeaderMenuPrimary
                        headerMenu={headerMenu.filter(item => item.typeId === HeaderMenuTypeEnum.Primary.id)}
                    />
                    <LayoutHeaderMenuSecondary
                        headerMenu={headerMenu.filter(item => item.typeId === HeaderMenuTypeEnum.Secondary.id)}
                    />
                </div>
            </UiWrap>
        </div>
    );
};
