'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiPage, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PVacancyForm = observer(() => {
    return (
        <div className="vacancy-form">
            <UiPage.Wrap>

                <UiForm>
                    <div className="vacancy-form-header">
                        <h2 className="vacancy-form-header__title">Хотите у нас работать?</h2>
                        <p className="vacancy-form-header__text">Расскажите нам о себе</p>
                    </div>
                    <div className="vacancy-form-body">
                        <div className="vacancy-form-body-row">
                            <div className="vacancy-form-body-row-item">
                                <h5 className="vacancy-form-body-row-item__title">Интересующая вакансия</h5>
                                <UiInput placeholder={"Выбрать"}/>
                            </div>
                            <div className="vacancy-form-body-row-item">
                                <h5 className="vacancy-form-body-row-item__title">Имя и фамилия</h5>
                                <UiInput placeholder={"IVANOV IVAN"}/>
                            </div>
                            <div className="vacancy-form-body-row-item">
                                <h5 className="vacancy-form-body-row-item__title">E-mail для связи</h5>
                                <UiInput placeholder={"Введите адрес"}/>
                            </div>
                            <div className="vacancy-form-body-row-item">
                                <h5 className="vacancy-form-body-row-item__title">Телефон</h5>
                                <UiInput placeholder={"+7 --- --- -- --"}/>
                            </div>
                        </div>
                        <div className="vacancy-form-body-row">
                            <UiButton className="vacancy-form-body__confirm" template={'large'} type={'submit'} colors={{
                                button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                                label: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                            }}>
                                <span>Загрузить резюме</span>
                            </UiButton>
                            <p className="vacancy-form-body-row__text">Отправляя резюме, вы соглашаетесь на передачу <span className="vacancy-form-body-row__text--underlined">персональных данных</span></p>
                            <UiButton className="vacancy-form-body__confirm" template={'large'} type={'submit'} colors={{
                                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}>
                                <span>Отправить</span>
                            </UiButton>
                        </div>


                    </div>
                </UiForm>
            </UiPage.Wrap>
        </div>
    )
})
