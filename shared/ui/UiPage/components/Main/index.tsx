'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
}

export const Main = observer(({ children }: PropsType) => {
    return (
        <div className="ui-page-main">
                {children}
        </div>
    )
})
