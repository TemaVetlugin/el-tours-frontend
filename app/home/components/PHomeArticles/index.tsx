'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { PromoActionModel } from "shared/models";
import { UiGrid, UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    promoActions: PromoActionModel[],
}

export const PHomePromoActions = observer(({ promoActions }: PropsType) => {
    return (
        <UiPage.Section
            title={'Акции'}
            link={(<UiPage.SectionLink href={ROUTES.HOME().url}>Смотреть все</UiPage.SectionLink>)}
        >
            <UiGrid columns={4} gap={20} className="">
                {promoActions.slice(0, 4).map(promoAction => (
                    <UiLink href={ROUTES.HOME().url} key={promoAction.id} className="p-home-articles-item">
                        <div
                            className="p-home-articles-item__image"
                            style={{ backgroundImage: `url(${promoAction.previewImage})` }}
                        />
                        <div className="p-home-articles-item__name">{promoAction.name}</div>
                    </UiLink>
                ))}
            </UiGrid>
        </UiPage.Section>
    )
})
