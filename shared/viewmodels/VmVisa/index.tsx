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


export const VmVisa = observer(({country}: PropsType) => {

    const classNames = classnames('vm-visa', `vm-visa--${country.type}`);

    return (
        <UiLink href={ROUTES.COUNTRY().url} className={classNames} style={{backgroundImage: `url(${country.src})`}}>

            <div className="vm-visa-header">
                {country.visa &&
                    <UiButton
                        template={'normal'}
                        className={'vm-visa__button'}
                        colors={{
                            button: [COLORS.DARK_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>{country.visa}</span>
                    </UiButton>
                }
            </div>
            <div className="vm-visa__body">
                <div>
                    {country.flag &&
                        <div className="vm-visa__flag" style={{backgroundImage: `url(${country.flag})`}}></div>
                    }
                    <h3 className="vm-visa__place">{country.text}</h3>
                    <span className="vm-visa__description">{country.text}</span>
                </div>
            </div>
        </UiLink>
    )
})
