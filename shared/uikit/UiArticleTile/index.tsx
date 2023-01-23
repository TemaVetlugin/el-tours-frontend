import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { UiLink } from "shared/uikit";
import badgeBg from "./assets/badge.svg";

import './index.scss';

type PropsType = {
    href: string,
    name: string,
    image: string,
    badge?: string,
    isLarge?: boolean
    isSmall?: boolean
    isMedium?: boolean
}

export const UiArticleTile = observer(({ image, name, href, isLarge, isSmall, isMedium, badge }: PropsType) => {
    const className = classnames('ui-article-tile', {
        'ui-article-tile--large': isLarge,
        'ui-article-tile--small': isSmall,
        'ui-article-tile--medium': isMedium,
        'ui-article-tile--promo': badge
    });

    return (
        <UiLink href={href} className={className}>
            <div className="ui-article-tile__image" style={{ backgroundImage: `url(${image})` }}>
                {!!badge && <div className="ui-article-tile__badge" style={{ backgroundImage: `url("${badgeBg.src}")` }}>{badge}</div>}
            </div>
            <h4 className="ui-article-tile__name">{name}</h4>
        </UiLink>
    )
});
