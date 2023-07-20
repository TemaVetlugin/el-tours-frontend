'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Wrap } from './components/Wrap';
import { Section } from './components/Section';
import { Link } from './components/Link';
import { Pagination } from './components/Pagination';
import { Content } from './components/Content';
import { Aside } from './components/Aside';
import { Actions } from './components/Actions';

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
    Header,
    Breadcrumbs,
    Wrap,
    Section,
    Link,
    Pagination,
    Aside,
    Content,
    Actions
})
