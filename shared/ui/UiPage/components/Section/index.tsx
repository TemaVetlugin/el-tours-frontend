'use client';

import React, { CSSProperties } from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    title?: string,
    id?:string
    style?: CSSProperties,
    children?: React.ReactNode,
    link?: React.ReactNode,
}

export const Section = observer(({ title, children, style, link, id }: PropsType) => {
    return (
        <div id={id} className="ui-page-section" style={style}>
            <div className="ui-page-section__header">
                <div className="ui-page-section__title">
                    {title}
                </div>
                {link && (
                    <div className="ui-page-section__link">{link}</div>
                )}
            </div>

            <div className="ui-page-section__inner">
                {children}
            </div>
        </div>
    )
})
