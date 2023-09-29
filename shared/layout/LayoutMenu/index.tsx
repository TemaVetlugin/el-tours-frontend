'use client';

import {observer} from "mobx-react-lite";
import React from "react";

import {AppService, UserService} from "shared/services";
import {UiButton, UiIcon, UiLink, UiModal, UiPage, UiWrap} from "shared/ui";
import {COLORS} from "shared/contants";

import './index.scss';

type PropsType = {
    template?: 'home'|'default'
}

export const LayoutMenu = observer(({template='default'}: PropsType) => {


    return (
        <div className='layout-header-menu'>
            {template==='default'&&
            <UiButton
                onClick={() => {
                    AppService.menuIsOpened = true;
                }}
                template={'icon'}
                colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],

                }}
            >
                <UiIcon size={[22, 20]} name={'burger'}/>
            </UiButton>
            }
            {template==='home'&&
            <UiButton
                onClick={() => {
                    AppService.menuIsOpened = true;
                }}
                template={'icon'}
                colors={{
                    button: [COLORS.TRANSPARENT, COLORS.WHITE],
                    border: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.WHITE, COLORS.BLACK],

                }}
            >
                <UiIcon size={[22, 20]} name={'burger'}/>
            </UiButton>
            }

            <UiModal
                isOpened={AppService.menuIsOpened}
            >
                <UiWrap className='layout-header-menu-header'>
                    <UiButton
                        onClick={() => {
                            AppService.menuIsOpened = false;
                        }}
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

                    {AppService.footerMenuSections.map(title=>
                        <div key={title.id} className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span>{title.name}</span>
                            </div>
                            <div className="layout-header-menu-links-column__content">
                                {AppService.footerMenuItems.filter(item=>item.footerMenuSectionId===title.id).map(link=>
                                    <UiLink key={link.id} >{link.name}</UiLink>
                                )}
                            </div>
                        </div>)}


                        <div className="layout-header-menu-links-column">
                            <div className="layout-header-menu-links-column__header">
                                <span >Продукты</span>
                            </div>
                            <ul className="layout-header-menu-links-column__content">
                                <li><UiLink>Авиабилеты</UiLink></li>
                                <li><UiLink>Туры</UiLink></li>
                                <li><UiLink>Отели</UiLink></li>
                                <li><UiLink>Отель + Перелет</UiLink></li>
                                <li><UiLink>Аренда авто</UiLink></li>
                                <li><UiLink>Круизы</UiLink></li>
                                <li><UiLink>Аренда недвижимости</UiLink></li>
                            </ul>
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
                                    <span className="layout-header-menu-links-contacts__subtitle">Горячая линия</span>
                                    <span className="layout-header-menu-links-contacts__title">+7 (383) 207-57-00</span>
                                    <span>Когда хотите обсудить вопрос по телефону</span>
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
                            <div>
                                <p className="layout-header-menu-links-contacts__subtitle">Чат в мессенджерах</p>
                                <div className="layout-header-menu-links-contacts__medias">
                                    <UiButton
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
                </UiPage.Wrap>
            </UiModal>
        </div>
    );
});
