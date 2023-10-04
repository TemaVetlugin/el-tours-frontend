'use client';

import {observer} from "mobx-react-lite";
import React from "react";
import {COLORS} from "shared/contants";

import {UiButton, UiForm, UiIcon, UiInput, UiLink, UiPage} from "shared/ui";

import './index.scss';
import { AppService } from "shared/services";

export const LayoutFooter = observer(() => {
    return (
        <div className="layout-footer">
            <UiPage.Wrap>
                <div className="layout-footer-contacts">
                    <div className="layout-footer-contacts__item">
                        <div className="layout-footer-contacts__icon">
                            <UiIcon
                                size={24}
                                name={"phone"}
                                color={COLORS.WHITE}
                            />
                        </div>
                        <div>
                            <span className="layout-footer__subtitle">Горячая линия</span>
                            <span className="layout-footer__title">+7 (383) 207-57-00</span>
                            <span>Когда хотите обсудить вопрос по телефону</span>
                        </div>
                    </div>
                    <div className="layout-footer-contacts__item">
                        <div className="layout-footer-contacts__icon">
                            <UiIcon
                                size={[24, 27]}
                                name={"email"}
                                color={COLORS.WHITE}
                            />
                        </div>
                        <div>
                            <span className="layout-footer__subtitle">Электронная почта</span>
                            <span className="layout-footer__title">zapros@el-tours.ru</span>
                            <span>Когда удобнее отправить письмо</span>
                        </div>
                    </div>
                    <div className="layout-footer-contacts__medias">
                        <span className="layout-footer__subtitle">Чат в мессенджерах</span>
                        <div>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={18} name={'vk'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={18} name={'telegram'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={18} name={'whatsapp'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={18} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={18} name={'viber'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                        </div>
                    </div>
                </div>
            </UiPage.Wrap>
                <UiPage.Wrap className="layout-footer__wrap">
                    <div className="layout-footer-topics">
                        <div className="layout-footer-topics-logo">
                            <div className="layout-footer-topics-logo__image"></div>

                            <span>Эль-Тур - это туристическая компания нового поколения. Мы используем все доступные сегодня технологии чтобы сделать
                            выбор, оплату и бронирование Вашего путешествия максимально удобными и приятными.</span>

                            <div className="layout-footer-topics-logo__mailing">
                                <span className="layout-footer__text">Подписаться на рассылку:</span>
                                <UiForm>
                                    <UiInput
                                        placeholder='Ваш E-mail'
                                        name={'query'}
                                    />
                                    <UiButton template={'search_right'} type={'submit'} colors={{
                                        button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                        icon: [COLORS.WHITE, COLORS.WHITE],
                                    }}>
                                        <UiIcon size={24} name={'plane'}/>
                                    </UiButton>

                                </UiForm>
                            </div>
                        </div>


                        {AppService.footerMenuSections.map(title=>
                        <div key={title.id} className="layout-footer-topics-column">
                            <div className="layout-footer-topics-column__header">
                                <span className="layout-footer__text">{title.name}</span>
                            </div>
                            <div className="layout-footer-topics-column__list">
                            {AppService.footerMenuItems.filter(item=>item.footerMenuSectionId===title.id).map(link=>
                                    <UiLink key={link.id} >{link.name}</UiLink>
                            )}
                            </div>
                        </div>)}
                    </div>
                </UiPage.Wrap>

            <div className="layout-footer-end">
                <span>© 2023, «Эль-Тур»</span>
            </div>
        </div>
    );
});
