'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import './index.scss';

type PropsType = {
    title?: string | React.ReactNode,
    children?: React.ReactNode,
}

export const Section = observer(({ children, title }: PropsType) => {
    return (
        <div className={'ui-panel-section'}>
            <div className="ui-panel-section__title">{title}</div>
            {children}
        </div>
    );
});
