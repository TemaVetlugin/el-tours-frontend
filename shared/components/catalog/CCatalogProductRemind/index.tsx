'use client'

import { observer } from "mobx-react-lite";
import React from "react";
import { COLORS } from "shared/contants";
import { useStore } from "shared/hooks";

import { CatalogProductModel } from "shared/models";
import { userRemindersSaveQuery } from "shared/queries/main";
import { UserService } from "shared/services";
import { UiButton, UiDatepicker, UiIcon, UiModal } from "shared/ui";
import { date, Notifier } from "shared/utilities";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProductRemind = observer(({ catalogProduct }: PropsType) => {
    const store = useStore({
        isRemind: false,
        remindAt: date().plus({ days: 7 }).toISO()
    })

    const handleSubmitRemind = async () => {
        userRemindersSaveQuery({
            catalogProductId: catalogProduct.id,
            remindAt: store.remindAt as string
        });
        Notifier.alert('Напоминание зарегистрировано, мы сообщим Вам когда придёт время напоминания - пришлем пуш или смс');
        store.set("isRemind", false);
    }

    return (
        <>
            <div className="c-catalog-product-remind" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!UserService.isAuthorized()) {
                    return;
                }
                store.set("isRemind", true);
            }}>
                <UiIcon size={24} name={"alarm"} color={COLORS.RED_PRIMARY}/>
                <span className={'underwave'}>Напомнить заказать</span>
            </div>
            <UiModal isOpened={store.isRemind} onClose={() => store.set('isRemind', false)}>
                <UiModal.Title value={'Напомнить заказать'}/>
                <UiModal.Description value={catalogProduct.name}/>
                <UiDatepicker
                    value={store.remindAt}
                    min={date().toISO() as string}
                    onChange={(data) => store.set("remindAt", data.value)}
                />
                <UiModal.Actions>
                    <UiButton label={'Напомнить'} onClick={handleSubmitRemind}/>
                </UiModal.Actions>
            </UiModal>
        </>
    )
})
