'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Title } from './components/Title';
import { Breadcrumbs } from './components/Breadcrumbs';

import './index.scss';

type PropsType = {
    className?: string,
    children?: React.ReactNode
}

const Page = observer((
    {
        className,
        children
    }: PropsType
) => {

    return (
        <main className={classnames('ui-page', className)}>
            {children}
        </main>
    )
})

export const UiPage = Object.assign(Page, {
    Title,
    Breadcrumbs,
})
