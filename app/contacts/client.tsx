'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { MEDIA_POINTS, ROUTES } from "shared/contants";
import { UiGrid, UiPage } from "shared/ui";

import image from './assets/image.png';
import locationIcon from './assets/location-icon.svg';
import mailIcon from './assets/mail-icon.svg';

export const Client = observer(() => {
    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.CONTACTS()]}/>
                <UiPage.Header title={'Контакты'}/>
                <div className={'p-contacts'}>
                    <UiGrid
                        className={'p-contacts__items'}
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 20 },
                            [MEDIA_POINTS.IS_1024]: { columns: 2, gap: 20 },
                        }}
                    >
                        <div className="p-contacts-item">
                            <div className="p-contacts-item__icon" style={{ backgroundImage: `url(${locationIcon.src})` }}/>
                            <div className="p-contacts-item__inner">
                                <div className="p-contacts-item__label">Адрес</div>
                                <div className="p-contacts-item__value">Вписать адрес</div>
                            </div>
                        </div>
                        <div className="p-contacts-item">
                            <div className="p-contacts-item__icon" style={{ backgroundImage: `url(${mailIcon.src})` }}/>
                            <div className="p-contacts-item__inner">
                                <div className="p-contacts-item__label">Информационная запись</div>
                                <a href="mailto:info@ya-apteka.ru" className="p-contacts-item__value">info@ya-apteka.ru</a>
                            </div>
                        </div>
                    </UiGrid>
                    <div className="p-contacts__image" style={{ backgroundImage: `url(${image.src})` }}/>
                </div>
            </UiPage.Wrap>
        </UiPage>
    )
});
