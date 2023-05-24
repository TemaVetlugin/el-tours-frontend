import React from "react";
import { observer } from "mobx-react";

import { useHover } from "shared/hooks";
import { UiLink } from "shared/uikit";

import './index.scss';

type PropsType = {
    children: (isHovered: boolean) => React.ReactNode,
    href?: string,
    onClick?: React.MouseEventHandler,
    label?: string,
    alert?: string | number
}

export const LayoutHeaderAction = observer(({ children, href, onClick, label, alert = 0 }: PropsType) => {
    const { ref, isHovered } = useHover<any>();

    const content = (
        <>
            <div className="layout-header-action__inner">
                {children(isHovered)}
                {!!alert && (<div className="layout-header-action__alert">{alert}</div>)}
            </div>
            {label && <div className="layout-header-action__label">{label}</div>}
        </>
    )

    if (href) {
        return (
            <UiLink href={href} className='layout-header-action' onClick={onClick} ref={ref}>
                {content}
            </UiLink>
        )
    }
    return (
        <div className='layout-header-action' onClick={onClick} ref={ref}>
            {content}
        </div>
    )
})
