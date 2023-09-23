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


export const VmCountry = observer(({country}: PropsType) => {

    const classNames = classnames('vm-country', `vm-country--${country.type}`);

    return (
        <UiLink href={ROUTES.COUNTRY().url} className={classNames} style={{backgroundImage: `url(${country.src})`}}>

            <div className="vm-country-header">
                {country.weather &&
                    <UiButton
                        template={'normal'}
                        className={'vm-country__button'}
                        colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>{country.weather}</span>
                    </UiButton>
                }
                {country.visa &&
                    <UiButton
                        template={'normal'}
                        className={'vm-country__button vm-country__button--gray'}
                        colors={{
                            button: [COLORS.DARK_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>{country.visa}</span>
                    </UiButton>
                }
                <div className={"vm-country__icon--flex"}>
                    {country.views &&
                        <div className="vm-country__icon">
                            <UiIcon size={[24, 24]} name={"views"}/>
                            <span>{country.views}</span>
                        </div>
                    }
                    {country.comments &&
                        <div className="vm-country__icon">
                            <UiIcon size={20} name={"comments"}/>
                            <span>{country.comments}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="vm-country__body">
                <div>
                    {country.flag &&
                        <div className="vm-country__flag" style={{backgroundImage: `url(${country.flag})`}}></div>
                    }
                    <h3 className="vm-country__place">{country.text}</h3>
                    <span className="vm-country__description">{country.text}</span>
                </div>
                {country.id === 3 &&
                    <div>
                        <h3 className={`vm-country__price`}>{country.text} <UiIcon size={28} name={'fire'}></UiIcon></h3>
                        <div className="vm-country__details">

                            <span>{country.text}{country.text}{country.text}{country.text}{country.text}</span>

                        </div>
                    </div>
                }
            </div>
        </UiLink>
    )
})
