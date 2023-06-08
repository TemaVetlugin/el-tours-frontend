'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Title } from './components/Title';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Wrap } from './components/Wrap';
import { Section } from './components/Section';

import './index.scss';

type PropsType = {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
}

const Page = observer((
    {
        className,
        style,
        children
    }: PropsType
) => {

    return (
        <main className={classnames('ui-page', className)} style={style}>
            {children}
        </main>
    )
})

export const UiPage = Object.assign(Page, {
    Title,
    Breadcrumbs,
    Wrap,
    Section
})
