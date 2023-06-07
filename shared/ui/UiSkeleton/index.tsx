'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    className?: string,
    style?: React.CSSProperties
    isLoading?: boolean,
    children?: React.ReactNode
}

export const UiSkeleton = observer(({ className, isLoading = true, children = null, style }: PropsType) => {
    if (!isLoading) {
        return (<>{children}</>)
    }
    return (
        <div className={classnames('ui-skeleton', className)} style={style}/>
    )
});
