import React from "react";
import { observer } from "mobx-react";
import { ThreeDots } from 'react-loader-spinner'

import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    isLoading?: boolean,
    children?: React.ReactNode,
    style?: React.CSSProperties,
    color?: string
}

export const UiLoading = observer((
    {
        isLoading = true,
        children,
        style = {},
        color = COLORS.PRIMARY
    }: PropsType
) => {
    const {
        width,
        height,
        ...styles
    } = style;

    if (isLoading) {
        return (
            <div className="ui-loading" style={{height, ...styles}}>
                <ThreeDots
                    color={color || COLORS.PRIMARY}
                    width={width}
                    height={height}
                />
            </div>
        )
    }
    return (
        <>{children}</>
    )
})
