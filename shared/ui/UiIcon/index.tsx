'use client';

import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";

import * as icons from 'shared/icons';

import './index.scss';

type PropsType = {
    size: number | [number, number],
    name: keyof typeof icons,
    color?: string | string[]
}

export const UiIcon = observer((
    {
        size = 16,
        name,
        color = ['#000'],
    }: PropsType
) => {
    const sizes: [number, number] = useMemo(() => {
        return Array.isArray(size) ? size : [size, size];
    }, [size]);

    const colors = useMemo(() => {
        return Array.isArray(color) ? color : [color];
    }, [color]);

    if(!icons[name]){
        console.error(`UiIcon: icon ${name} not found`);
        return null;
    }
    return (
        <div className='ui-icon' data-name={name} style={{ width: sizes[0], height: sizes[1] }}>
            {icons[name](sizes, colors)}
        </div>
    )
})

