import React, { useMemo } from "react";
import { observer } from "mobx-react";

import { COLORS } from "shared/contants";
import { assets } from './assets';

import './index.scss';

type PropsType = {
    name?: keyof typeof assets,
    size: number | [number, number],
    color?: string,
    stickerSize?: number | [number, number],
    children?: React.ReactNode
}

export const UiStickerCircle = observer((
    {
        name,
        size,
        color = COLORS.ORANGE_LIGHT,
        stickerSize,
        children
    }: PropsType
) => {
    const sizes: [number, number] = useMemo(() => {
        return Array.isArray(size) ? size : [size, size];
    }, [size]);

    const stickerSizes: [number, number] = useMemo(() => {
        if (!stickerSize) {
            return [0, 0];
        }
        return Array.isArray(stickerSize) ? stickerSize : [stickerSize, stickerSize];
    }, [stickerSize]);

    const sticker = useMemo(() => {
        if (!name) {
            return null;
        }
        return assets[name];
    }, [name]);

    return (
        <div className="ui-circle-sticker" style={{ width: sizes[0], height: sizes[1], backgroundColor: color }}>
            {sticker && (
                <img
                    className="ui-circle-sticker__image"
                    src={sticker}
                    width={stickerSizes[0]}
                    height={stickerSizes[1]}
                />
            )}
            {children}
        </div>
    )
})
