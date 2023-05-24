import React from "react";
import { observer } from "mobx-react";
import { UiIcon, UiLink } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    href: string,
    name: string,
    image: string,
    description?: string,
    isButton?: boolean
}

export const UiNewsTile = observer(({ image, name, href, description, isButton }: PropsType) => {
    return (
        <UiLink href={href} className="ui-news-tile">
            <div className="ui-news-tile__image" style={{ backgroundImage: `url(${image})` }}/>
            <div className="ui-news-tile__inner">
                <h4 className="ui-news-tile__name">{name}</h4>
                {!!description && <p className="ui-news-tile__description">{description}</p>}
                {isButton && (
                    <UiLink className={'underline-wave underline-wave--large'}>
                        <span>Читать</span>
                        <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                    </UiLink>
                )}
            </div>
        </UiLink>
    )
});
