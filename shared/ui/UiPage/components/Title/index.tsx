'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    value?: string,
    style?: CSSProperties,
    aside?: () => React.ReactNode
}

export const Title = observer(({ value, style, aside }: PropsType) => {
    return (
        <div className="ui-page-title" style={style}>
            <div className="ui-page-title__value">
                {value}
            </div>
            {!!aside && (
                <div className="ui-page-title__aside">
                    {aside()}
                </div>
            )}
        </div>
    )
})
