'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import classnames from "classnames";

import {UiButton, UiLink} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import './index.scss';

type PropsType = {
    tour: { id: number, type: 'small' | 'large', src?: string, flag?: string, weather?: string, views?: number, comments?: number, visa?: string, text?: string },
}


export const VmTour = observer(({tour}: PropsType) => {

    const classNames = classnames('vm-tour', `vm-tour--${tour.type}`);

    return (
        <UiLink href={ROUTES.COUNTRY().url} className={classNames} style={{backgroundImage: `url(${tour.src})`}}>

            <div className="vm-tour-header">
                {tour.weather &&
                    <UiButton
                        template={'normal'}
                        className={'vm-tour__button'}
                        colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>{tour.weather}</span>
                    </UiButton>
                }
                {tour.weather &&
                    <UiButton
                        template={'normal'}
                        className={'vm-tour__button vm-tour__button--gray'}
                        colors={{
                            button: [COLORS.DARK_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>{tour.weather}</span>
                    </UiButton>
                }
            </div>
            <div className="vm-tour__body">
                <div>
                    <h3 className="vm-tour__place">{tour.text}</h3>
                    <span className="vm-tour__country">{tour.text}</span>
                </div>
                <div>
                    <h3 className={classnames(`vm-tour__price`, tour.type === 'large' && 'vm-tour__price--end')}>{tour.text}</h3>
                    <div className="vm-tour__details">
                        {tour.type === 'small' && <UiButton
                            template={'normal'}
                            className={'vm-tour__button--small'}
                            colors={{
                                button: [COLORS.DARK_SECONDARY, COLORS.GREEN_SECONDARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}
                        >
                            <span>{tour.text}</span>
                        </UiButton>}
                        <span>{tour.text}{tour.text}{tour.text}{tour.text}{tour.text}</span>
                        {tour.type === 'large' && <UiButton
                            template={'normal'}
                            className={'vm-tour__button--small'}
                            colors={{
                                button: [COLORS.DARK_SECONDARY, COLORS.GREEN_SECONDARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}
                        >
                            <span>{tour.text}</span>
                        </UiButton>}
                    </div>
                </div>
            </div>
        </UiLink>
    )
})
