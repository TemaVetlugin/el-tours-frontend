import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { UiLink } from "shared/uikit";

import './index.scss';

type PropsType = {
    href: string,
    name: string,
    image: string,
    isLarge?: boolean
    isSmall?: boolean
    isMedium?: boolean
}

export const UiArticleTile = observer(({ image, name, href, isLarge, isSmall, isMedium }: PropsType) => {
    const className = classnames('ui-article-tile', {
        'ui-article-tile--large': isLarge,
        'ui-article-tile--small': isSmall,
        'ui-article-tile--medium': isMedium
    });

    return (
        <UiLink href={href} className={className}>
            <div className="ui-article-tile__image" style={{ backgroundImage: `url(${image})` }}/>
            <h4 className="ui-article-tile__name">{name}</h4>
        </UiLink>
    )
});
