'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PCompanyFormAside = observer(() => {
    return (
        <UiForm className="p-company-form-aside">
            <div className="p-company-form-aside__header">
                <h2>Реквизиты компании</h2>
                <p>ООО «Эль-Тур»</p>
            </div>

            <div className="p-company-form-aside-body">
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">ИНН:</p>
                    <p className="p-company-form-aside-body__text">5406436252</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">ИПП:</p>
                    <p className="p-company-form-aside-body__text">540601001</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">ОГРН:</p>
                    <p className="p-company-form-aside-body__text">1085406012922</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">Юридический
                        адрес:</p>
                    <p className="p-company-form-aside-body__text">630099, г. Новосибирск, ул.Фрунзе, 84</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">Фактический адрес:</p>
                    <p className="p-company-form-aside-body__text">г.Новосибирск, ул.Вокзальная магистраль, 10</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">р/с:</p>
                    <p className="p-company-form-aside-body__text">40702810023220001293</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">Банк:</p>
                    <p className="p-company-form-aside-body__text">Филиал "Новосибирский" АО "Альфа-Банк" г. Новосибирск</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">к/с:</p>
                    <p className="p-company-form-aside-body__text">30101810600000000774</p>
                </div>
                <div className="p-company-form-aside-body__row">
                    <p className="p-company-form-aside-body__title">БИК:</p>
                    <p className="p-company-form-aside-body__text">045004774</p>

                </div>
            </div>
        </UiForm>
    )
})
