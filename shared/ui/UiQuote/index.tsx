'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string
}

export const UiQuote = observer(({ children, className }: PropsType) => {
    const classNames = classnames('ui-quote', className);
    return (
        <div  className={classNames}>
            <div className="ui-quote__img"></div>
            <div className="ui-quote__column">
                <p>
                    {children}
                </p>
            </div>
        </div>
    )
})
