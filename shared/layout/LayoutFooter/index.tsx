'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogService } from "shared/services";
import { UiButton, UiLink, UiModal, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { Notifier } from "shared/utilities";

import './index.scss';

export const LayoutFooter = observer(() => {
    return (
        <div className="layout-footer">
            <UiWrap>
                <div className="layout-footer__menus">
                    <div className="layout-footer__aside">
                        <div className="layout-footer-menu">
                            <div className="layout-footer-menu__title">Покупателям</div>
                            <div className="layout-footer-menu__items">
                                <div className="layout-footer-menu__item">Контакты</div>
                                <div className="layout-footer-menu__item">Лицензии</div>
                            </div>
                            <div className="layout-footer-menu__contacts">
                                <div className="layout-footer-menu__contact">+7 (3822) 54-39-99</div>
                                <div className="layout-footer-menu__contact">info@ya-apteka.ru</div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-footer__catalog">
                        <div className="layout-footer-menu">
                            <div className="layout-footer-menu__title">Каталог</div>
                            <div className="layout-footer-menu__columns">
                                {CatalogService.catalogCategoriesByCatalogCategoryId['null']?.map((catalogCategory) => (
                                    <UiLink
                                        key={catalogCategory.id}
                                        href={ROUTES.CATALOG(catalogCategory.slug).url}
                                        className="layout-footer-menu__item"
                                    >
                                        {catalogCategory.name}
                                    </UiLink>
                                ))}
                                <div className="layout-footer-menu__item">Лицензии</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout-footer__contraindications">
                    ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА.
                </div>
                <div className="layout-footer__copyright">
                    <div className="layout-footer__policies">
                        <div className="layout-footer__policy">
                            Пользовательское соглашение
                        </div>
                        <div className="layout-footer__policy">
                            Политика конфиденциальности
                        </div>
                        <div className="layout-footer__policy">
                            © 2022 Я+аптека
                        </div>
                    </div>
                    <div className="layout-footer__offer">
                        Цены на сайте не являются публичной офертой. Внешний вид товара может отличаться от представленного на сайте. Цены на сайте отличаются от цен в аптеках и
                        действуют только при оформлении заказа с помощью сайта.и
                    </div>
                </div>
            </UiWrap>
            <UiModal isOpened={Notifier.data.alert.isOpened} onClose={() => Notifier.data.alert.resolve(true)} width={380}>
                <UiModal.Description>
                    {Notifier.data.alert.message}
                </UiModal.Description>
                <UiModal.Actions>
                    <UiButton label={'Понятно'} onClick={() => Notifier.data.alert.resolve(true)}/>
                </UiModal.Actions>
            </UiModal>
            <UiModal isOpened={Notifier.data.prompt.isOpened} onClose={() => Notifier.data.prompt.resolve(false)} width={380}>
                <UiModal.Description>
                    {Notifier.data.prompt.message}
                </UiModal.Description>
                <UiModal.Actions>
                    <UiButton label={'Принять'} onClick={() => Notifier.data.prompt.resolve(true)}/>
                    <UiButton
                        label={'Отменить'}
                        onClick={() => Notifier.data.prompt.resolve(false)}
                        colors={{
                            button: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                            label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                        }}
                    />
                </UiModal.Actions>
            </UiModal>
        </div>
    );
});
