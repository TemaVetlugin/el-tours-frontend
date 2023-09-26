'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import { UiButton, UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";
import './index.scss';


export const PVisaManager = observer(() => {
    return (
        <div className="p-visa-manager">
            <div className="p-visa-manager-header__image"></div>
            <div className="p-visa-manager-header">
                <h2 className="p-visa-manager-header__title">Виктория Гончарова</h2>
                <span className="p-visa-manager-header__subtitle">Ваш менеджер визового отдела</span>
            </div>

            <div className="p-visa-manager-body">
                <div className="p-visa-manager-body__contact">
                    <UiIcon size={20} name={"phone"} color={COLORS.GRAY_PRIMARY}/>
                    <span>+7 (383) 207-57-01, доб. 103</span>
                </div>
                <div className="p-visa-manager-body__contact">
                    <UiIcon size={[18, 20]} name={"email"} color={COLORS.GRAY_PRIMARY}/>
                    <span>visa@el-tours.ru</span>
                </div>
                <div className="p-visa-manager-body__contact">
                    <UiIcon size={[18, 20]} name={"spot"} color={COLORS.GRAY_PRIMARY}/>
                    <span>г. Новосибирск, ул. Вокзальная магистраль, дом 10</span>
                </div>
            </div>
            <div className="p-visa-manager__medias">
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
                        <UiIcon size={18} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
            </div>
        </div>
    )
})
