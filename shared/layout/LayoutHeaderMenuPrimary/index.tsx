'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { HeaderMenuModelInterface } from "shared/models";

import { LayoutService } from "shared/services";
import { HeaderMenuTypeEnum } from "shared/enums";

import './index.scss';

type PropsType = {
    headerMenu: HeaderMenuModelInterface[]
}

export const LayoutHeaderMenuPrimary = observer(() => {
    return (
        <div className="layout-header-menu-primary">
            {LayoutService.headerMenu.filter(headerMenu => headerMenu.type.is(HeaderMenuTypeEnum.Primary)).map(item => (
                <a key={item.id} href={item.href} className="layout-header-menu-primary__item">
                    {item.name}
                </a>
            ))}
        </div>
    );
});
