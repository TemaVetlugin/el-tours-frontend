'use client';

import React from "react";

import { LayoutService } from "shared/services";
import { HeaderMenuItemTypeEnum } from "shared/enums";

import './index.scss';

export const LayoutHeaderMenuSecondary = () => {
    return (
        <div className="layout-header-menu-secondary">
            {LayoutService.headerMenuItems.filter(headerMenu => headerMenu.type.is(HeaderMenuItemTypeEnum.Secondary)).map(item => (
                <a key={item.id} href={item.url} className="layout-header-menu-secondary__item">
                    {item.name}
                </a>
            ))}
        </div>
    );
};
