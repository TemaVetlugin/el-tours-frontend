'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { HeaderMenuItemModelInterface } from "shared/models";

import { LayoutService } from "shared/services";
import { HeaderMenuItemTypeEnum } from "shared/enums";
import { UiLink } from "shared/ui";

import './index.scss';

type PropsType = {
    headerMenu: HeaderMenuItemModelInterface[]
}

export const LayoutHeaderMenuPrimary = observer(() => {
    return (
        <div className="layout-header-menu-primary">
            {LayoutService.headerMenuItems.filter(headerMenu => headerMenu.type.is(HeaderMenuItemTypeEnum.Primary)).map(item => (
                <UiLink key={item.id} href={item.url} className="layout-header-menu-primary__item">
                    {item.name}
                </UiLink>
            ))}
        </div>
    );
});
