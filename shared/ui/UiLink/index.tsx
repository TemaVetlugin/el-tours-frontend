'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classnames from "classnames";
import { url } from "shared/utilities";

import { UrlType } from "shared/types";

import './index.scss';


type PropsType = {
    href?: UrlType,
    activeRoutes?: string[],
    className?: string | [string, string],
    style?: React.CSSProperties,
    children?: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void,
    onMouseEnter?: (e: React.MouseEvent) => void,
    target?: string
}

export const UiLink = observer((
    {
        href,
        className: _className = '',
        children,
        onClick,
        onMouseEnter,
        target,
        style,
        activeRoutes = []
    }: PropsType,
) => {
    const route = usePathname();
    let className = _className || 'ui-link';
    let classNamesArray = typeof className === 'string' ? [className, `${className}--active`] : className;
    const activeClassName = classNamesArray[1];
    const classNames = classnames('ui-link', classNamesArray[0], {
        [activeClassName]: route === href || activeRoutes?.includes(route)
    });

    return (
        <Link
            style={style}
            href={url(href)}
            className={classNames}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            target={target}
            prefetch={false}
        >
            {children}
        </Link>
    )
});
