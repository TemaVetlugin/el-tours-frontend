'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Title } from './components/Title';
import { Header } from './components/Header';

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
}

const Panel = observer(({ children, className }: PropsType) => {
    return (
        <div className={classnames('ui-panel', className)}>
            {children}
        </div>
    )
});

export const UiPanel = Object.assign(Panel, {
    Header,
    Title
})

