'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";

import arrow from './assets/arrow.svg';
import './index.scss';

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

type PropsType = {
    href: string | RouteType,
    children?: React.ReactNode
}

export const Link = observer(({ href, children }: PropsType) => {
    return (
        <UiLink href={href} className="ui-page-link">
            <span className={'underwave'}>{children}</span>
            <div className="ui-page-link__arrow" style={{ backgroundImage: `url(${arrow.src})` }}/>
        </UiLink>
    )
})
