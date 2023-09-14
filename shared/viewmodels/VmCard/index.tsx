'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {WorkerModel} from "shared/models";
import {UiButton, UiIcon, UiLink, UiPage} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import './index.scss';
import {UserService} from "shared/services";
import classnames from "classnames";
import {RouteType} from "next/dist/lib/load-custom-routes";

type PropsType = {
    header?: React.ReactNode,
    body?: React.ReactNode,
    background?: string,
    slug: string,
    template?: 'small' | 'large'
    className?: string,
}


export const VmCard = observer(({ header, className, slug, template = 'small', body, background}: PropsType) => {

    const classNames = classnames('vm-card', `vm-card--${template}`,className);

    return (
        <UiLink href={ROUTES.ARTICLES(slug)} className={classNames} style={{ backgroundImage: `url(${background})`}}>
            <div className="vm-card__header">{header}</div>
            <div className="vm-card__body">{body}</div>

        </UiLink>
    )
})
