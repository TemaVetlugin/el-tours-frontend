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
                <p className="layout-footer-form__text">Составим для вас подборку туров, поможет с бронированием и ответим на вопросы.
                    Вы можете позвонить, написать на почту или отправить сообщение в мессенджере.</p>
                <UiForm className="layout-header-search__control">
                    <div className="layout-footer-form-row">
                        <div className="layout-footer-form-row__item">
                            <p>Ваше имя</p>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                        </div>
                        <div className="layout-footer-form-row__item">
                            <p>Номер телефона *</p>
                            <UiInput
                                placeholder=''
                                name={'query'}
                            />
                        </div>
                        <div className="layout-footer-form-row__item">
                            <p>Город вылета</p>
                            <div className="layout-footer-form-row__input">
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
                    <div className="layout-footer-form-row">
                        <div className="layout-footer-form-row__item">
                            <p>Страна, курорт или отель</p>
                            <div className="layout-footer-form-row__input">
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
                        <div className="layout-footer-form-row__item">
                            <p>Дата вылета</p>
                            <div className="layout-footer-form-row__input">
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
                        <div className="layout-footer-form-row__item">
                            <p>Ночей</p>
                            <div className="layout-footer-form-row__input">
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
