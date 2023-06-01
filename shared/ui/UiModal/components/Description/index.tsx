'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    value?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export const Description = observer(({ value, style, children }: PropsType) => {
    return (
        <div className="ui-modal-description" style={style}>
            {value}
            {children}
        </div>
    )
})
