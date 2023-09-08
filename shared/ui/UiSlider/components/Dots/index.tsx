'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { NavigationType } from "../../types/Navigation.type";

import './index.scss';

type PropsType = {
    navigation: NavigationType
}

export const Dots = observer(({ navigation }: PropsType) => {
    return (
        <div className="ui-slider-dots">
            <div className={'ui-slider-dots__inner'}>
                {navigation.dots('ui-slider-dots__item')}
            </div>
        </div>
    )
})
