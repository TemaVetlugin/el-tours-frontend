'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { PromoActionModel } from "shared/models";
import { UiGrid, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';
import { CTilePromoAction } from "shared/components/tiles/CTilePromoAction";

type PropsType = {
    promoActions: PromoActionModel[],
}

export const PHomePromoActions = observer(({ promoActions }: PropsType) => {
    return (
        <UiPage.Section
            title={'Акции'}
            link={(<UiPage.Link href={ROUTES.PROMO_ACTIONS()}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={4} gap={20} className="">
                {promoActions.slice(0, 4).map(promoAction => <CTilePromoAction key={promoAction.id} item={promoAction}/>)}
            </UiGrid>
        </UiPage.Section>
    )
})
