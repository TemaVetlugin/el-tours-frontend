'use client'

import { observer } from "mobx-react-lite";
import React from "react";
import { COLORS } from "shared/contants";

import { CatalogProductModel } from "shared/models";
import { UserService } from "shared/services";
import { UiButton } from "shared/ui";
import { Notifier } from "shared/utilities";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProductSubscribe = observer(({ catalogProduct }: PropsType) => {
    return (
        <UiButton
            className={'c-catalog-product-subscribe'}
            onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!UserService.isAuthorized()) {
                    return;
                }

                Notifier.alert('Мы сообщим Вам о поступлении товара - пришлем пуш или смс');
            }}
            colors={{
                button: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
            }}
        >
            Сообщить о поступлении
        </UiButton>
    )
})
