import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    label?: string,
    color?: string,
    icon?: string,
}

export const UiBadge = observer((
    { label = 'Акция', color = '#B0CB1F', icon = './assets/images/badges/percent.svg' }: PropsType) => {
    return (
        <div className="ui-badge" style={{backgroundColor: color}}>
            <div className="ui-badge__label"><span>{label}</span></div>
            <div className="ui-badge__icon" style={{backgroundImage: `url(${icon})`}}/>
        </div>
    )
})
