'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { COLORS, ROUTES } from "shared/contants";
import { FooterMenuItemTypeEnum } from "shared/enums";

import {CatalogService, LayoutService, UserService} from "shared/services";
import {UiButton, UiForm, UiIcon, UiInput, UiLink, UiModal, UiPage, UiWrap} from "shared/ui";
import { Notifier } from "shared/utilities";

import './index.scss';
import {LayoutFooterForm} from "shared/layout/LayoutFooterForm";

export const LayoutFooter = observer(() => {
    return (
        <div className="layout-footer">
            <UiPage.Wrap>
                <div className="layout-footer-contacts">
                    <div className="layout-footer-contacts__item">
                        <div className="layout-footer__icon">
                            <UiIcon
                                size={24}
                                name={"phone"}
                                color={'WHITE'}
                            />
                        </div>
                        <div>
                            <p className="layout-footer__subtitle">Горячая линия</p>
                            <p className="layout-footer__title">+7 (383) 207-57-00</p>
                            <p>Когда хотите обсудить вопрос по телефону</p>
                        </div>
                    </div>
                    <div className="layout-footer-contacts__item">
                        <div className="layout-footer__icon">
                            <UiIcon
                                size={[24, 27]}
                                name={"email"}
                                color={'WHITE'}
                            />
                        </div>
                        <div>
                            <p className="layout-footer__subtitle">Электронная почта</p>
                            <p className="layout-footer__title">zapros@el-tours.ru</p>
                            <p>Когда удобнее отправить письмо</p>
                        </div>
                    </div>
                    <div className="layout-footer-contacts__medias">
                        <p className="layout-footer__subtitle">Чат в мессенджерах</p>
                        <div>
                            <UiButton
                                onClick={() => {
                                }}
                                notification={UserService.user.userFavorites.length}
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
                                onClick={() => {
                                }}
                                notification={UserService.user.userFavorites.length}
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
                                onClick={() => {
                                }}
                                notification={UserService.user.userFavorites.length}
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
                                onClick={() => {
                                }}
                                notification={UserService.user.userFavorites.length}
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
                                onClick={() => {
                                }}
                                notification={UserService.user.userFavorites.length}
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
            <div className="layout-footer-body">
                <UiPage.Wrap>
                    <div className="layout-footer-topics">
                        <div className="layout-footer-topics__item">
                        <div className="layout-footer-topics__logo" >
                            <img src={require('./assets/logo.svg').default.src} alt=""/>
                        <p>Эль-Тур - это туристическая компания нового поколения. Мы используем все доступные сегодня технологии чтобы сделать
                            выбор, оплату и бронирование Вашего путешествия максимально удобными и приятными.</p>
                        </div>
                            <div className="layout-footer-topics__mailing">
                            <p className="layout-footer__topic">Подписаться на рассылку:</p>
                            <UiForm>
                                <UiInput
                                    placeholder='Ваш E-mail'
                                    name={'query'}
                                />
                                <UiButton template={'search_right'} type={'submit'} colors={{
                                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}>
                                    <UiIcon size={24} name={'plain'}/>
                                </UiButton>

                            </UiForm>
                        </div>
                        </div>

                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                                <p className="layout-footer__topic">Продукты</p>
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Авиабилеты</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Туры</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Отели</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Отель + Перелет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Аренда авто</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Круизы</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Аренда недвижимости</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                                <p className="layout-footer__topic">Туры</p>
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Туры с споровождением</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Горящие туры</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Свадебные туры</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Детские лагеря</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Корпоративные туры</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Автобусные туры</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                <span><UiLink>Классические туры</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                                <p className="layout-footer__topic">Туристам</p>
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Оплата</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Оформление визы</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Поиск пары в тур</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Рассрочка и кредит</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Страхование</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Сим-карты</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Подарочный сертификат</UiLink></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-footer-topics">
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                                <p className="layout-footer__topic">О компании</p>
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Сотрудники</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Достижения</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вакансии</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Отзывы туристов</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Блог</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Контакты</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                                <p className="layout-footer__topic">Страны</p>
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">
                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">

                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">

                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-footer-topics__item">
                            <div className="layout-footer-topics__item__header">

                            </div>
                            <div className="layout-footer-topics__item_content">
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-footer-topics__item__row">
                                    <div className="layout-footer__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </UiPage.Wrap>
            </div>
            <div className="layout-footer-end">
                <span>© 2018, «Эль-Тур»</span>
            </div>
        </div>
    );
});
