import React from "react";
import { observer } from "mobx-react";
import { UiLink } from "shared/uikit";

import './index.scss';

type PropsType = {
    href: string,
    name: string,
    image: string,
}

export const UiNewsTile = observer(({ image, name, href }: PropsType) => {
    return (
        <UiLink href={href} className="ui-news-tile">
            <div className="ui-news-tile__image" style={{ backgroundImage: `url(${image})` }}/>
            <h4 className="ui-news-tile__name">{name}</h4>
        </UiLink>
    )
});
