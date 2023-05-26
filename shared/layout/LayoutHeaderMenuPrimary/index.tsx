import React from "react";

import { HeaderMenuModelInterface } from "shared/models";

import './index.scss';

type PropsType = {
    headerMenu: HeaderMenuModelInterface[]
}

export const LayoutHeaderMenuPrimary = ({ headerMenu }: PropsType) => {
    return (
        <div className="layout-header-menu-primary">
            {headerMenu.map(item => (
                <a key={item.id} href={item.href} className="layout-header-menu-primary__item">
                    {item.name}
                </a>
            ))}
        </div>
    );
};
