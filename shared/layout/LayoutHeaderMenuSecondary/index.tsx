'use client';
import React from "react";

import { LayoutService } from "shared/services";
import { HeaderMenuTypeEnum } from "shared/enums";

import './index.scss';

export const LayoutHeaderMenuSecondary = () => {
    return (
        <div className="layout-header-menu-secondary">
            {LayoutService.headerMenu.filter(headerMenu => headerMenu.type.is(HeaderMenuTypeEnum.Secondary)).map(item => (
                <a key={item.id} href={item.href} className="layout-header-menu-secondary__item">
                    {item.name}
                </a>
            ))}
        </div>
    );
};
