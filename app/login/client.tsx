'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useCity, useRouter, useStore} from "shared/hooks";
import {ArticleModel, PaginationModel} from "shared/models";
import {UiPage, UiTypography} from "shared/ui";

import './page.scss';
import {PLoginSignUpEmail} from "./components/PLoginSignupEmail";
import {PLoginSignUpConfirm} from "./components/PLoginSignupConfirm";
import {PLoginSignUpPhone} from "./components/PLoginSignupPhone";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
        activeSlide: 0,
        isShallowLoading: true,

    });


    return (
        <UiPage className="login">
            <UiPage.Wrap className="login--wrap">
                <div className="login-banner">
                    <div className="login-banner__logo"></div>
                    <h3 className="login-banner__title">В личном кабинете вы сможете:</h3>
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
