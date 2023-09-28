'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PVacancyFormAside = observer(() => {
    return (
        <UiForm className="p-vacancy-form-aside">
            <div className="p-vacancy-form-aside__header">
                <h2>Мы ждем вас!</h2>
                <p>Напишите нам, позвоните или
                    оставьте резюме в форме ниже</p>
            </div>

            <div className="p-vacancy-form-aside-body">
                <div className="p-vacancy-form-aside-body__contact">
                    <UiIcon size={20} name={"phone"} color={COLORS.GRAY_PRIMARY}/>
                    <span>+7 (383) 207-57-01, доб. 103</span>
                </div>
                <div className="p-vacancy-form-aside-body__contact">
                    <UiIcon size={[18, 20]} name={"email"} color={COLORS.GRAY_PRIMARY}/>
                    <span>visa@el-tours.ru</span>
                </div>
                <UiButton className="p-vacancy-form-aside-body__confirm" template={'large'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                    border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                    label: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                }}>
                    <span>Отправить резюме</span>
                </UiButton>
            </div>
            <div className="p-vacancy-form-aside-body__medias">
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
        </UiForm>
    )
})
