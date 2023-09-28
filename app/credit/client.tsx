'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useSearchParams, useStore } from "shared/hooks";
import { UiPage, UiTypography } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { PageModel } from "shared/models";
import { PCreditServices } from "./components/PCreditServices";
import { PCreditCalculator } from "./components/PCreditCalculator";


export const Client = observer(() => {
    const store = useStore({
        item: new PageModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    return (
        <UiPage className="p-credit">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.SERVICES()}
                title={'Рассрочка и кредит'}
                subtitle={'Оформляем рассрочку без процентов и переплат'}
            />

            <UiPage.Wrap className="p-credit--flex" template={'aside'}>
                <UiPage.Main>
                    <UiTypography>
                        <p>Уже многие наши клиенты воспользовались кредитом и рассрочкой для поездки. Вы можете купить тур, имея только часть суммы в наличии и покрыть кредит в удобные Вам сроки (от 1 дня до 1.5 года), а также, имея первноначальный взнос в размере всего 30% от суммы тура, Вы можете оформить рассрочку без процентов и переплат! Кредиты
                            и рассрочка оформляются прямо у нас в офисе.</p>
                    </UiTypography>
                    <PCreditCalculator/>
                </UiPage.Main>
                <UiPage.Aside>
                    <div className="p-credit-aside">
                        <PCreditServices/>
                    </div>
                </UiPage.Aside>
            </UiPage.Wrap>

        </UiPage>
    )
});
