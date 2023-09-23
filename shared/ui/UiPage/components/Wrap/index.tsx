'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    template?: 'normal' | 'aside',
    className?: string
}

export const Wrap = observer(({ children, className, template='normal' }: PropsType) => {
    const classNames = classnames(`ui-page-wrap ${template==='aside'&&'ui-page-wrap--aside'}`, className);
    return (
        <div className={classNames}>
            {children}
        </div>
    )
})
