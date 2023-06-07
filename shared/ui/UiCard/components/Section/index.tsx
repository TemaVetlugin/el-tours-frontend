'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    title?: string,
    children?: React.ReactNode
}

export const Section = observer(({ title, children }: PropsType) => {
    return <div className="ui-card-section">
        {title && (
            <div className="ui-card-section__title">{title}</div>
        )}
        <div className="ui-card-section__inner">
            {children}
        </div>
    </div>;
});
