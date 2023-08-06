'use client'

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { ROUTES } from "shared/contants";

import { PromoActionModel } from "shared/models";
import { UiLink } from "shared/ui";
import { date } from "shared/utilities";

import dateBackground from './assets/date-background.svg';

import './index.scss';

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
            >
                {item.dateTo && (
                    <div className="c-tile-promo-action__date" style={{ backgroundImage: `url(${dateBackground.src})` }}>
                        до {date(item.dateTo).toFormat('d MMMM')}
                    </div>
                )}
            </div>
            <div className="c-tile-promo-action__name">{item.name}</div>

        </UiLink>
    )
})
