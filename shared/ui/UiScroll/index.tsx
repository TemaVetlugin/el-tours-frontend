'use client';
import React, { useMemo, useState } from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { Scrollbars } from 'react-custom-scrollbars-2';

import './index.scss';

type PropsType = {
    maxHeight?: number | string,
    height?: number | string,
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
}

export const UiScroll = observer(({ maxHeight, height, className, children, style }: PropsType) => {
    const [isDragging, setIsDragging] = useState(false);
    const classNames = classnames('ui-scroll', className, {
        'ui-scroll--scrolling': isDragging
    });

    return (
        <Scrollbars
            className={classNames}
            style={style}
            height={height}
            autoHeightMax={maxHeight}
            autoHeight={!!maxHeight}
            universal
            hideTracksWhenNotNeeded
            onScrollStart={() => {
                setIsDragging(true)
            }}
            onScrollStop={() => setIsDragging(false)}
            renderTrackVertical={props => <div {...props} className={"ui-scroll__track"}/>}
            renderThumbVertical={props => <div {...props} className="ui-scroll__thumb"/>}
        >
            <div className="ui-scroll__inner">
                {children}
            </div>
        </Scrollbars>
    )
})
