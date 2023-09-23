'use client';

import React from "react";
import {observer} from "mobx-react-lite";

import {UiIcon, UiLink, UiPage} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import './index.scss';

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

type PropsType = {
    backTo?: RouteType,
    title?: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    aside?: React.ReactNode,
}

export const Header = observer(({title, backTo, subtitle, aside}: PropsType) => {
    return (
        <div className="ui-page-header">
            <UiPage.Wrap className="ui-page-header__wrap">
                <div>
                    <UiLink href={backTo} className={'ui-page-header__back'}>
                        <UiIcon size={[34, 10]} name={"arrowLeft"} color={COLORS.WHITE}/>
                        {backTo?.name}
                    </UiLink>
                    {title&&typeof(title)==="string" && (
                        <div className="ui-page-header__title">
                            <h1>{title}</h1>
                        </div>
                    )}
                    {title&&typeof(title)!=="string" && (
                        <>
                            {title}
                        </>
                    )}
                    {subtitle&&typeof(subtitle)==="string" && (
                        <div className="ui-page-header__subtitle">
                            <span>{subtitle}</span>
                        </div>
                    )}
                    {subtitle&&typeof(subtitle)!=="string" && (
                        <>
                            {subtitle}
                        </>
                    )}

                </div>
                {aside && (
                    <div className="ui-page-header__aside">
                        {aside}
                    </div>
                )}
            </UiPage.Wrap>
        </div>
    )
})
