'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    value?: string,
    style?: CSSProperties,
}

export const Title = observer(({ value, style }: PropsType) => {
    return (
        <div className="ui-page-title" style={style}>
            {value}
        </div>
    )
})
