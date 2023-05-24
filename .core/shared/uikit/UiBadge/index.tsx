import React from "react";
import { observer } from "mobx-react";

import './index.scss';
import classNames from "classnames";

type PropsType = {
    label?: string,
    color?: string,
    icon?: string,
    isSmall?: boolean
}

export const UiBadge = observer((
    { label, color = '#B0CB1F', icon = './assets/images/badges/percent.svg', isSmall = false }: PropsType) => {
    const className = classNames('ui-badge', {'ui-badge--small': isSmall});

    return (
        <div className={className} style={{backgroundColor: color}}>
            {!!label && <div className="ui-badge__label"><span>{label}</span></div>}
            <div className="ui-badge__icon" style={{backgroundImage: `url(${icon})`}}/>
        </div>
    )
})
