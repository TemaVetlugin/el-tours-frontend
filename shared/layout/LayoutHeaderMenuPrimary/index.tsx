'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { HeaderMenuItemModelInterface } from "shared/models";

import { LayoutService } from "shared/services";
import { HeaderMenuTypeEnum } from "shared/enums";
import { UiLink } from "shared/ui";

import './index.scss';

type PropsType = {
    headerMenu: HeaderMenuItemModelInterface[]
}

export const LayoutHeaderMenuPrimary = observer(() => {
    return (
        <div className="layout-header-menu-primary">
            {LayoutService.headerMenuItems.filter(headerMenu => headerMenu.type.is(HeaderMenuTypeEnum.Primary)).map(item => (
                <UiLink key={item.id} href={item.href} className="layout-header-menu-primary__item">
                    {item.name}
                </UiLink>
            ))}
        </div>
    );
});
