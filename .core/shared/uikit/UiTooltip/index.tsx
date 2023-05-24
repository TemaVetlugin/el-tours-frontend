import React from "react";
import { observer } from "mobx-react";

import arrow from './assets/arrow.svg';
import './index.scss';

type PropsType = {
    label?: string,
    children?: React.ReactNode
}

export const UiTooltip = observer(({ label, children }: PropsType) => {
    return (
        <div className="ui-tooltip">
            <div className="ui-tooltip__inner">
                {children}
            </div>
            <div className="ui-tooltip__outer">
                <i style={{background: `url(${arrow.src})`}}/>
                <div className="ui-tooltip__label">
                    {label}
                </div>
            </div>
        </div>
    )
})
