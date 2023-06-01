'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { Oval } from 'react-loader-spinner'

import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    isLoading?: boolean,
    children?: React.ReactNode,
    size?: number,
    style?: React.CSSProperties,
    color?: string
}

export const UiLoading = observer((
    {
        isLoading = true,
        children,
        style = {},
        size = 20,
        color = COLORS.GREEN_PRIMARY
    }: PropsType
) => {
    if (isLoading) {
        return (
            <div className="ui-loading" style={style}>
                <Oval
                    width={size}
                    height={size}
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                    secondaryColor={COLORS.TRANSPARENT}
                    color={color}
                />
            </div>
        )
    }
    return (
        <>{children}</>
    )
})
