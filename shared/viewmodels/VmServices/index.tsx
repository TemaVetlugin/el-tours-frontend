'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import classnames from "classnames";
import {UiButton, UiIcon, UiLink} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import './index.scss';

type PropsType = {
    country: { id: number, type: 'small' | 'large', src?: string, flag?: string, weather?: string, views?: number, comments?: number, visa?: string, text?: string },
}


export const VmService = observer(({country}: PropsType) => {

    const classNames = classnames('vm-service', `vm-service--${country.type}`);

    return (
        <UiLink href={ROUTES.COUNTRY().url} className={classNames} style={{backgroundImage: `url(${country.src})`}}>
            <div className="vm-service__header"></div>

            <div className="vm-service__body">
                <div>
                    <h3 className="vm-service__place">{country.text}</h3>
                    <span className="vm-service__description">{country.text}</span>
                </div>
            </div>
        </UiLink>
    )
})
