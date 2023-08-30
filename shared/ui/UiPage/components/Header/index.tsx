'use client';

import React, {CSSProperties} from "react";
import {observer} from "mobx-react-lite";

import './index.scss';
import {UiIcon, UiPage} from "shared/ui";
import {ROUTES} from "shared/contants";

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

type PropsType = {
    titleComplex?: () => React.ReactNode,
    title?: string,
    subtitle?: string,
    views?: number,
    comments?: number,
    items?: RouteType[],
    aside?: () => React.ReactNode
}

export const Header = observer(({title, titleComplex, subtitle, views, comments, aside, items}: PropsType) => {
    return (

        <div className="ui-page-header">
            <UiPage.Wrap>

                <UiPage.Breadcrumbs
                    items={items}/>
                {!!titleComplex && (
                    <div className="ui-page-header__title">
                        {titleComplex()}
                    </div>
                )}
                {!!title && (
                    <div className="ui-page-header__title">
                        <h1>{title}</h1>
                    </div>
                )}
                <div className="ui-page-header__properties">
                    {!!subtitle && (
                        <span className="ui-page-header__properties__text">{subtitle}</span>
                    )}
                    {(!!views||views==0) && (
                        <div className="ui-page-header__properties__item">
                            <UiIcon size={[24, 24]} name={"views"}/>
                            <span>{views}</span>
                        </div>
                    )}
                    {!!comments && (
                        <div className="ui-page-header__properties__item">
                            <UiIcon size={20} name={"comments"}/>
                            <span>{comments}</span>
                        </div>
                    )}
                </div>

                {!!aside && (
                    <div className="ui-page-header__aside">
                        {aside()}
                    </div>
                )}
            </UiPage.Wrap>
        </div>
    )
})
