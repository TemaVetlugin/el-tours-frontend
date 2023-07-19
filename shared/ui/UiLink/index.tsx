'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classnames from "classnames";
import { ROUTES } from "shared/contants";

import './index.scss';

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

type PropsType = {
    href?: string | RouteType | null,
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
    let url = '#';
    if (typeof href === 'string') {
        url = href;
    } else if (typeof href === 'object' && href && 'url' in href) {
        url = href.url
    }

    return (
        <Link
            style={style}
            href={url}
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
