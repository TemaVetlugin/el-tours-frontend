import React from "react";
import { observer } from "mobx-react";

import { UiLink } from "../UiLink";

import './index.scss';

type PropsType = {
    href: string,
    name: string,
    image: string,
}

export const UiCardTile = observer(({ href, name, image }: PropsType) => {
    return (
        <UiLink href={href} className="ui-card-tile">
            <div className="ui-card-tile__inner">
                <div className="ui-card-tile__preview">
                    <div
                        className="ui-card-tile__image"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                </div>
                <div className="ui-card-tile__name">{name}</div>
            </div>
            <div className="ui-card-tile-overlay">
                <div className="ui-card-tile-overlay__name">{name}</div>
                <div className="ui-card-tile-overlay__preview">
                    <div
                        className="ui-card-tile-overlay__image"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                </div>
            </div>
        </UiLink>
    )
})
