'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    title?: string,
    subtitle?: string,
    style?: CSSProperties,
    aside?: () => React.ReactNode
}

export const Header = observer(({ title, subtitle, style, aside }: PropsType) => {
    return (
        <div className="ui-page-header" style={style}>
            <div className="ui-page-header__inner">
                <div className="ui-page-header__title">
                    {title}
                </div>
                <div className="ui-page-header__subtitle">
                    {subtitle}
                </div>
            </div>
            {!!aside && (
                <div className="ui-page-header__aside">
                    {aside()}
                </div>
            )}
        </div>
    )
})
