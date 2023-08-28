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


export const PVacancyFormAside = observer(() => {
    return (
        <UiForm className="form-aside">
            <div className="form-aside__header">
                <h2>Мы ждем вас!</h2>
                <p>Напишите нам, позвоните или
                    оставьте резюме в форме ниже</p>
            </div>
            <div className="form-aside__contact">
                <UiIcon size={20} name={"phone"} color={COLORS.GRAY_PRIMARY}/>
                <span>+7 (383) 207-57-01, доб. 103</span>
            </div>
            <div className="form-aside__contact">
                <UiIcon size={[24, 27]} name={"email"} color={COLORS.GRAY_PRIMARY}/>
                <span>+7 (383) 207-57-01, доб. 103</span>
            </div>
            <UiButton className="form-aside__confirm" template={'large'} type={'submit'} colors={{
                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                label: [COLORS.WHITE, COLORS.WHITE],
            }}>
                <span>Подписаться</span>
            </UiButton>
        </UiForm>
    )
})
