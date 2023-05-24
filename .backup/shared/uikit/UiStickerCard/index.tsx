import React from "react";
import { observer } from "mobx-react";

import './index.scss';
import classnames from "classnames";

type PropsType = {
    withShadow?: boolean,
    sticker?: React.ReactNode,
    title?: string,
    description?: string
}

export const UiStickerCard = observer((
    {
        sticker,
        withShadow = false,
        title,
        description
    }: PropsType
) => {
    return (
        <div className={classnames('ui-sticker-card', {'ui-sticker-card--shadow': withShadow})}>
            {sticker && <div className="ui-sticker-card__sticker">{sticker}</div>}
            <div className="ui-sticker-card__inner">
                {title && <div className="ui-sticker-card__title">{title}</div>}
                {description && <div className="ui-sticker-card__description">{description}</div>}
            </div>
        </div>
    )
});
