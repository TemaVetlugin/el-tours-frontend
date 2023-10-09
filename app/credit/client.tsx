'use client';

import React from "react";
import {observer} from "mobx-react-lite";

import {useAsyncEffect, useSearchParams, useStore} from "shared/hooks";
import {UiPage, UiTypography} from "shared/ui";
import {LayoutHeader} from "shared/layout";
import {ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import {PageModel} from "shared/models";
import {PCreditServices} from "./components/PCreditServices";
import {PCreditCalculator} from "./components/PCreditCalculator";
import {pageQuery} from "shared/queries/main";
import {html} from "shared/utilities";


export const Client = observer(() => {
    const store = useStore({
        item: new PageModel(),
        page: new PageModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1,})

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await pageQuery({
            url: ROUTES.CREDIT().url,
        });
        if (isSuccess && data) {
            store.set("page", new PageModel(data.item));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page]);

    return (
        <UiPage className="p-credit">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.SERVICES()}
                title={store.page.title}
                subtitle={store.page.subtitle}
            />

            <UiPage.Wrap className="p-credit--flex" template={'aside'}>
                <UiPage.Main>
                    <UiTypography>
                        {html(store.page.description)}
                    </UiTypography>
                    <h2 className="p-credit__title">
                        Рассчитать тур в рассрочку
                    </h2>
                    <PCreditCalculator/>
                    <div className="p-credit-tabs">
                        <div className="p-credit-tabs-headers">
                            <div className="p-credit-tabs-headers__item p-credit-tabs-headers__item--active">
                                <span>Туры в кредит</span>
                            </div>
                            <div className="p-credit-tabs-headers__item">
                                <span>Туры в рассрочку</span>
                            </div>
                        </div>
                        <div className="p-credit-tabs-body">
                            <div>
                                <span className={'p-credit-tabs-body__title'}>Требования к заёмщику:</span>
                                <span className={'p-credit-tabs-body__list'}>Возраст: от 21 года до 60 лет;</span>
                                <span className={'p-credit-tabs-body__list'}>Стаж работы на последнем рабочем месте минимум 3 месяца.</span>
                            </div>
                            <div>
                                <span className={'p-credit-tabs-body__title'}>Необходимые документы:</span>
                                <span className={'p-credit-tabs-body__list'}>Паспорт РФ;</span>
                                <span className={'p-credit-tabs-body__list'}>Второй документ(если сумма более 100 000 рублей).</span>
                            </div>
                            <div>
                                <span className={'p-credit-tabs-body__title'}>Условия кредита:</span>
                                <span className={'p-credit-tabs-body__list'}>Срок кредита от 6 до 24 месяцев;</span>
                                <span className={'p-credit-tabs-body__list'}>Размер кредита до 300 000 рублей;</span>
                                <span className={'p-credit-tabs-body__list'}>Первоначальный взнос от 0% до 99%, в зависимости от выбранного предложения;</span>
                                <span className={'p-credit-tabs-body__list'}>Возможность досрочного погашения (с 1 дня без штрафов и комиссий).</span>
                            </div>
                            <div>
                                <span className={'p-credit-tabs-body__title'}>Примеры:</span>
                                <span className={'p-credit-tabs-body__list--end'}>Вы покупаете тур стоимостью 60 000 руб.  У Вас имеется первоначальный взнос 20 000 руб. Необходим кредит на сумму 40 000 руб. Кредит на 6 месяцев.</span>
                                <span className={'p-credit-tabs-body__list--end'}>Сумма ежемесячного платежа составит 7 450,00 рублей. Сумма переплаты за кредит 4 735,94 рублей за 6 месяцев.</span>
                            </div>
                        </div>
                    </div>
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
