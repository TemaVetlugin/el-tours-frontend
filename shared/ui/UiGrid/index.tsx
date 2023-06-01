'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import classnames from "classnames";

import { MediaPropType, RecordValueType } from "shared/types";
import { lodash } from "shared/utilities";
import { MEDIA_POINTS } from "shared/contants";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
    columns?: number | string,
    gap?: number | [number, number],
    style?: React.CSSProperties,
    media?: MediaPropType<PropsType, "columns" | "gap" | "style">
}

export const UiGrid = observer((
    {
        children,
        columns = 1,
        className,
        gap = 0,
        media = {},
        style = {}
    }: PropsType
) => {
    const optionsToStyles = ({ gap, columns, style }: RecordValueType<typeof media>): Record<string, any> => {
        const styles: React.CSSProperties = {
            ...style
        };
        if (columns) {
            styles['gridTemplateColumns'] = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
        }
        if (gap !== undefined) {
            styles['gridRowGap'] = Array.isArray(gap) ? gap[1] + 'px' : gap + 'px';
            styles['gridColumnGap'] = Array.isArray(gap) ? gap[0] + 'px' : gap + 'px';
        }
        return styles;
    };

    const stylesToString = (options: Record<string, any>) => {
        const styles = optionsToStyles(options);
        return `${Object.keys(styles).map((property) => {
                    return `${lodash.kebabCase(property)}: ${styles[property]};`;
                }).join('')}`;
    }

    // using styled jsx for server render, cascade media styles 360 < 768 < 1024 < 1366
    return (
        <div className={classnames('ui-grid', className)}>
            <style jsx>
                {`
                    .ui-grid {
                        ${stylesToString({ gap, columns, style })}
                    }

                    @media (min-width: 0px) {
                        .ui-grid {
                            ${stylesToString(media[MEDIA_POINTS.IS_360] || {})}
                        }
                    }

                    @media (min-width: ${MEDIA_POINTS.IS_768}px) {
                        .ui-grid {
                            ${stylesToString(media[MEDIA_POINTS.IS_768] || {})}
                        }
                    }

                    @media (min-width: ${MEDIA_POINTS.IS_1024}px) {
                        .ui-grid {
                            ${stylesToString(media[MEDIA_POINTS.IS_1024] || {})}
                        }
                    }

                    @media (min-width: ${MEDIA_POINTS.IS_1440}px) {
                        .ui-grid {
                            ${stylesToString(media[MEDIA_POINTS.IS_1440] || {})}
                        }
                    }
                `}
            </style>
            {children}
        </div>
    );
});
