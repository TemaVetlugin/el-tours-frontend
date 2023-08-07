'use client'

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { COLORS } from "shared/contants";

import { CatalogProductModel } from "shared/models";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    className?: string,
    badges: CatalogProductModel['badges'],
}

export const CCatalogProductBadges = observer(({ badges, className }: PropsType) => {
    if (badges.length === 0) {
        return null;
    }
    return (
        <div className={classnames("c-catalog-product-badges__items", className)}>
            {badges.map(badge => (
                <div key={badge.icon} className="c-catalog-product-badges__item" style={{ backgroundColor: badge.color }}>
                    <div className="c-catalog-product-badges__item__name">{badge.label}</div>
                    <UiIcon size={24} name={badge.icon} color={COLORS.WHITE}/>
                </div>
            ))}
        </div>

    )
})
