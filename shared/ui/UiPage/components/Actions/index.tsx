'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
}

export const Actions = observer(({ children, className }: PropsType) => {
    return (
        <div className={classnames('ui-page-actions', className)}>
            {children}
        </div>
    )
});
