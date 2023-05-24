import React, { forwardRef } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    href?: string | null,
    activeRoutes?: string[],
    className?: string | [string, string],
    style?: React.CSSProperties,
    children?: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void,
    onMouseEnter?: (e: React.MouseEvent) => void,
    target?:string
}

export const UiLink = observer(forwardRef<HTMLAnchorElement, PropsType>((
    { href, className: _className = '', children, onClick, onMouseEnter, target, style, activeRoutes = [] }: PropsType,
    ref
) => {
    const { route } = useRouter();
    let className = _className || 'ui-link';
    let classNamesArray = typeof className === 'string' ? [className, `${className}--active`] : className;
    const activeClassName = classNamesArray[1];
    const classNames = classnames('ui-link', classNamesArray[0], {
        [activeClassName]: route === href || activeRoutes?.includes(route)
    });
    if(!href){
        return (
            <div style={style} className={classNames} onClick={onClick} onMouseEnter={onMouseEnter}>
                {children}
            </div>
        )
    }
    return (
        <Link
            ref={ref}
            style={style}
            href={href}
            className={classNames}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            target={target}
        >
            {children}
        </Link>
    )
}));
