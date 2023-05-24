import React from "react";
import { observer } from "mobx-react";

import './index.scss';
import classnames from "classnames";

type PropsType = {
    style?: React.CSSProperties & {
        title?: React.CSSProperties
    },
    className?: string,
    title?: string | React.ReactNode,
    headerAside?: React.ReactNode,
    badge?: string | number | null,
    children?: React.ReactNode
}

export const LayoutSection = observer((
    {
        title,
        badge,
        headerAside,
        children,
        className,
        style: styles
    }: PropsType
) => {
    const {
        title: titleStyle,
        ...style
    } = (styles || {
        title: {}
    });

    return (
        <div className={classnames('layout-section', className)} style={style}>
            {title && (
                <div className='layout-section-header'>
                    <div className="layout-section-header__inner">
                        <div className="layout-section-header__title" style={titleStyle}>
                            {title}
                        </div>
                        {!!badge && <div className="layout-section-header__badge">{badge}</div>}
                    </div>
                    {!!headerAside && <div className="layout-section-header__aside">{headerAside}</div>}
                </div>
            )}
            <div className="layout-section__inner">
                {children}
            </div>
        </div>
    )
})
