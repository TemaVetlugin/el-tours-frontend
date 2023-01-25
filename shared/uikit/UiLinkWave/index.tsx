import React, { forwardRef } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    size?: 'small' | 'normal' | 'large',
    color?: 'dark' | 'primary'
    isLineSmall?: boolean
}

export const UiLinkWave = observer(forwardRef<HTMLAnchorElement, PropsType>((
    { children, size = 'normal', color = 'primary', isLineSmall = false }: PropsType,
) => {
    const className = classNames('ui-link-wave', `ui-link-wave--${size}`, `ui-link-wave--${color}`, {
        'ui-link-wave--line-small': isLineSmall
    });
    return (
        <div className={className}>
            {children}
        </div>
    )
}));
