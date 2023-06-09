'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Section } from './components/Section';
import { Panel } from './components/Panel';

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
}

const Card = observer(({ children, className }: PropsType) => {
    return (
        <div className={classnames('ui-card', className)}>
            {children}
        </div>
    )
});

export const UiCard = Object.assign(Card, {
    Section,
    Panel
})

