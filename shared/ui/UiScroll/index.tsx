'use client';
import React, { useMemo } from "react";
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
    const classNames = useMemo(() => classnames('ui-scroll', className), [className]);

    return (
        <Scrollbars
            className={classNames}
            style={style}
            height={height}
            autoHeightMax={maxHeight}
            autoHeight={!!maxHeight}
            universal
            hideTracksWhenNotNeeded
            renderTrackVertical={props => <div {...props} className="ui-scroll__track"/>}
            renderThumbVertical={props => <div {...props} className="ui-scroll__thumb"/>}
        >
            <div className="ui-scroll__inner">
                {children}
            </div>
        </Scrollbars>
    )
})
