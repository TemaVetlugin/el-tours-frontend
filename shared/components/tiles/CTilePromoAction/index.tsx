'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { PromoActionModel } from "shared/models";
import { UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    item: PromoActionModel,
    template?: 'base' | 'light'
}

export const CTilePromoAction = observer(({ item, template = 'base' }: PropsType) => {
    return (
        <UiLink href={ROUTES.PROMO_ACTIONS(item.slug)} key={item.id} className="c-tile-promo-action">
            <div
                className="c-tile-promo-action__image"
                style={{ backgroundImage: `url(${item.previewImage})` }}
            />
            <div className="c-tile-promo-action__name">{item.name}</div>
        </UiLink>
    )
})
