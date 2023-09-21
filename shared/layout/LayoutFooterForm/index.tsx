'use client';

import {observer} from "mobx-react-lite";
import React from "react";

import {UiButton, UiForm, UiIcon, UiInput, UiPage} from "shared/ui";

import './index.scss';
import {COLORS} from "shared/contants";

export const LayoutFooterForm = observer(() => {
    return (
        <div className="layout-footer-form">
            <UiPage.Wrap>
                <h2 className="layout-footer-form__header">
                    Подберем тур за вас
                </h2>
                <span className="layout-footer-form__text">Составим для вас подборку туров, поможет с бронированием и ответим на вопросы.
                    Вы можете позвонить, написать на почту или отправить сообщение в мессенджере.</span>
                <UiForm >
                    <div className="layout-footer-form-list">
                        <div className="layout-footer-form-list__item">
                            <span>Ваше имя</span>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                        </div>
                        <div className="layout-footer-form-list__item">
                            <span>Номер телефона *</span>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                        </div>
                        <div className="layout-footer-form-list__item">
                            <span>Город вылета</span>
                            <div className="layout-footer-form-list__input">
                            <UiButton template={'search_right'} type={'submit'} colors={{
                                button: [COLORS.WHITE, COLORS.WHITE],
                                icon: [COLORS.DARK_SECONDARY, COLORS.GRAY_PRIMARY],
                            }}>
                                <UiIcon size={12} name={'arrowDown'}/>
                            </UiButton>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                            </div>
                        </div>
                        <div className="layout-footer-form-list__item">
                            <span>Страна, курорт или отель</span>
                            <div className="layout-footer-form-list__input">
                                <UiButton template={'search_right'} type={'submit'} colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                }}>
                                    <UiIcon size={16} name={'close'}/>
                                </UiButton>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                            </div>
                        </div>
                        <div className="layout-footer-form-list__item">
                            <span>Дата вылета</span>
                            <div className="layout-footer-form-list__input">
                                <UiButton template={'search_right'} type={'submit'} colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                }}>
                                    <UiIcon size={16} name={'calendar'}/>
                                </UiButton>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                            </div>
                        </div>
                        <div className="layout-footer-form-list__item">
                            <span>Ночей</span>
                            <div className="layout-footer-form-list__input">
                                <UiButton template={'search_right'} type={'submit'} colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.DARK_SECONDARY, COLORS.GRAY_PRIMARY],
                                }}>
                                    <UiIcon size={12} name={'arrowDown'}/>
                                </UiButton>
                                <UiInput
                                    placeholder=''
                                    name={'query'}
                                />
                            </div>
                        </div>

                    </div>
                    <UiButton className="layout-footer-form__confirm" template={'large'} type={'submit'} colors={{
                        button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                        label: [COLORS.WHITE, COLORS.WHITE],
                    }}>
                        <span>Показать туры</span>
                    </UiButton>
                </UiForm>
            </UiPage.Wrap>
        </div>
    );
});
