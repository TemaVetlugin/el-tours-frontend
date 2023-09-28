'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiTypography } from "shared/ui";
import { PLoginSignUpConfirm } from "./components/PLoginSignupConfirm";

import './page.scss';

export const Client = observer(() => {


    return (
        <UiPage className="p-login">
            <UiPage.Wrap className="p-login--wrap">
                <div className="p-login-banner">
                    <div className="p-login-banner__logo"></div>
                    <h3 className="p-login-banner__title">В личном кабинете вы сможете:</h3>
                    <UiTypography>
                        <ul>
                            <li>следить за изменением цен на интересные Вам отели и направления</li>
                            <li>хранить всю историю заказов и документов по ним</li>
                            <li>копить бонусы на следующие путешествия</li>
                            <li>управлять настройками</li>
                        </ul>
                    </UiTypography>

                </div>
                <PLoginSignUpConfirm/>
            </UiPage.Wrap>
        </UiPage>
    )
});
