'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { PromoActionModel } from "shared/models";
import { UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';
import classnames from "classnames";

type PropsType = {
    item: PromoActionModel,
    template?: 'base' | 'light' | 'large'
}

export const CTilePromoAction = observer(({ item, template = 'base' }: PropsType) => {
    return (
        <UiLink
            key={item.id}
            href={ROUTES.PROMO_ACTIONS(item.slug)}
            className={classnames('c-tile-promo-action', `c-tile-promo-action--${template}`)}
        >
            <div
                className="c-tile-promo-action__image"
                style={{ backgroundImage: `url(${item.previewImage})` }}
            />
            <div className="c-tile-promo-action__name">{item.name}</div>
        </UiLink>
    )
})
