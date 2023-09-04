'use client';

import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useMask, useRouter, useStore, useUser, useValidation} from "shared/hooks";
import {LayoutService, UserService} from "shared/services";

import './index.scss';
import {isMobilePhone, isRequired} from "shared/validations";
import {usersConfirmQuery, usersLoginQuery} from "shared/queries/main";
import {UiButton, UiCheckbox, UiForm, UiIcon, UiInput, UiLink, UiModal, UiPage, UiWrap} from "shared/ui";
import {COLORS, MASKS, ROUTES} from "shared/contants";
import Link from "next/link";
import classnames from "classnames";

type PropsType = {
    children?: React.ReactNode,
    template?: 'home'

}

export const LayoutMenu = observer(({template, children}: PropsType) => {
    const router = useRouter();
    const store = useStore({
        errorMessage: '',
        isAccepted: 1,
        isLoading: false,
    });

    return (
        <div className='layout-header-menu'>

            <UiButton
                onClick={() => {
                    LayoutService.menuIsOpened = true;
                }}
                notification={UserService.user.userFavorites.length}
                template={'icon'}
                colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],

                }}
            >
                <UiIcon size={[22, 20]} name={'burger'}/>
            </UiButton>

            <UiModal
                isOpened={LayoutService.menuIsOpened}
            >
                <UiWrap className='layout-header-menu-header'>
                    <UiButton
                        onClick={() => {
                            LayoutService.menuIsOpened = false;
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.WHITE],
                            border: [COLORS.WHITE, COLORS.WHITE],
                            icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],

                        }}
                    >
                        <UiIcon size={[22, 20]} name={'closeLight'}/>
                    </UiButton>
                </UiWrap>
                <UiPage.Wrap className="layout-header-menu-links">
                    <div className="layout-header-menu-links__row">
                        <div className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span >Продукты</span>
                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Авиабилеты</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Отели</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Отель + Перелет</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Аренда авто</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Круизы</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Аренда недвижимости</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span >Туры</span>
                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Туры с споровождением</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Горящие туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Свадебные туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Детские лагеря</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Корпоративные туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Автобусные туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Классические туры</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span >Туристам</span>
                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Оплата</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Оформление визы</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Поиск пары в тур</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Рассрочка и кредит</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Страхование</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Сим-карты</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Подарочный сертификат</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span >О компании</span>
                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Сотрудники</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Достижения</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Вакансии</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Отзывы туристов</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Блог</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Контакты</UiLink></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-header-menu-links__row">
                        <div className="layout-header-menu-links-column layout-header-menu-links-column--wise">
                            <div className="layout-header-menu-links-column__header">
                                <span >Страны</span>
                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индонезия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Иордания</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Доминикана</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Кипр</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-header-menu-links-column layout-header-menu-links-column--wise">
                            <div className="layout-header-menu-links-column__header">

                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Тринидад и Тобаго</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индонезия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Иордания</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Доминикана</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Кипр</UiLink></span>
                                </div>
                            </div>
                        </div>
                        <div className="layout-header-menu-links-column layout-header-menu-links-column--wise">
                            <div className="layout-header-menu-links-column__header">

                            </div>
                            <div className="layout-header-menu-links-column_content">
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Россия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Туры</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Египет</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Турция</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Вьетнам</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Израиль</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Индонезия</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Иордания</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Доминикана</UiLink></span>
                                </div>
                                <div className="layout-header-menu-links-column__item">
                                    <div className="layout-header-menu__round"></div>
                                    <span><UiLink>Кипр</UiLink></span>
                                </div>
                            </div>
                        </div>

                        <div className="layout-header-menu-links-contacts">
                            <div className="layout-header-menu-links-column__header">
                            </div>
                            <div className="layout-header-menu-links-contacts__item">
                                <div className="layout-header-menu-links-contacts__icon">
                                    <UiIcon
                                        size={24}
                                        name={"phone"}
                                        color={COLORS.DARK_PRIMARY}
                                    />
                                </div>
                                <div>
                                    <p className="layout-header-menu-links-contacts__subtitle">Горячая линия</p>
                                    <p className="layout-header-menu-links-contacts__title">+7 (383) 207-57-00</p>
                                    <p>Когда хотите обсудить вопрос по телефону</p>
                                </div>
                            </div>
                            <div className="layout-header-menu-links-contacts__item">
                                <div className="layout-header-menu-links-contacts__icon">
                                    <UiIcon
                                        size={[24, 27]}
                                        name={"email"}
                                        color={COLORS.DARK_PRIMARY}
                                    />
                                </div>
                                <div>
                                    <p className="layout-header-menu-links-contacts__subtitle">Электронная почта</p>
                                    <p className="layout-header-menu-links-contacts__title">zapros@el-tours.ru</p>
                                    <p>Когда удобнее отправить письмо</p>
                                </div>
                            </div>
                            <div className="layout-header-menu-links-contacts__medias">
                                <p className="layout-header-menu-links-contacts__subtitle">Чат в мессенджерах</p>
                                <div>
                                    <UiButton
                                        onClick={() => {
                                        }}
                                        notification={UserService.user.userFavorites.length}
                                        template={'icon'}
                                        colors={{
                                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
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
                                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
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
                                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
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
                                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
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
                                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                        }}
                                    >
                                        <UiIcon size={18} name={'viber'} color={COLORS.GREEN_PRIMARY}/>
                                    </UiButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </UiPage.Wrap>
            </UiModal>
        </div>
    );
});
