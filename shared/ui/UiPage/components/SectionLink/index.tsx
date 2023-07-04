'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiLink } from "shared/ui";

import arrow from './assets/arrow.svg';
import './index.scss';

type PropsType = {
    href: string,
    children?: React.ReactNode
}

export const SectionLink = observer(({ href, children }: PropsType) => {
    return (
        <UiLink href={href} className="ui-page-section-link">
            <span className={'underwave'}>{children}</span>
            <div className="ui-page-section-link__arrow" style={{ backgroundImage: `url(${arrow.src})` }}/>
        </UiLink>
    )
})
