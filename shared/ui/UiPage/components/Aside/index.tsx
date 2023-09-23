'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    title?: string,
    children?: React.ReactNode,
}

export const Aside = observer(({ title, children }: PropsType) => {
    return (
        <div className="ui-page-aside">
                {children}
        </div>
    )
})
