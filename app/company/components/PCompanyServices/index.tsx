'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiLink, UiSlider, UiTypography} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PCompanyServices = observer(() => {
    return (
        <UiForm className="p-company-services">
            <div className="p-company-services__header_image"></div>
            <div className="p-company-services__header">
                <h2>Компания</h2>
            </div>

            <div className="p-company-services-body">
                    <ul>
                        <li className="p-company-services__text">О компании</li>
                        <li className="p-company-services__text">Сотрудники</li>
                        <li className="p-company-services__text">Достижения</li>
                        <li className="p-company-services__text">Вакансии</li>
                    </ul>
            </div>
        </UiForm>
    )
})
