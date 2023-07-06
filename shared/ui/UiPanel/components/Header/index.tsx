'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    children?: React.ReactNode
}

export const Header = observer(({children }: PropsType) => {
    return <div className="ui-panel-header">
        <div className="ui-panel-section__inner">
            {children}
        </div>
    </div>;
});
