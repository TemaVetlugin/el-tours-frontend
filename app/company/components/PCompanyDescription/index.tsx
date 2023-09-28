'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PCompanyDescription = observer(() => {
    return (
        <div className="p-company-description">
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={26} name={'star'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Интересная работа</h5>
                <p>Интересные задачи, гибкий график работы, профессиональный рост, высокий уровень зарплаты + бонусы за результат</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={28} name={'book'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Обучение</h5>
                <p>Посещение профильных мероприятий, обмен опытом с интересными людьми, библиотека с хорошими книгами, а также необычные тимбилдинги</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={28} name={'joystick'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Общение и отдых</h5>
                <p>Вкусный бесплатный кофе, утренние фрукты, игровая приставка, настольные игры, пятничные вечеринки и многое другое</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={26} name={'folder'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Современный офис</h5>
                <p>Современные офисы по всему миру. У нас царит командный дух и атмосфера путешествий, присоединяйтесь!</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={26} name={'star'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Интересная работа</h5>
                <p>Интересные задачи, гибкий график работы, профессиональный рост, высокий уровень зарплаты + бонусы за результат</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={28} name={'book'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Обучение</h5>
                <p>Посещение профильных мероприятий, обмен опытом с интересными людьми, библиотека с хорошими книгами, а также необычные тимбилдинги</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={28} name={'joystick'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Общение и отдых</h5>
                <p>Вкусный бесплатный кофе, утренние фрукты, игровая приставка, настольные игры, пятничные вечеринки и многое другое</p>
            </div>
            <div className="p-company-description__item">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GRAY_SECONDARY],
                        icon: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    }}
                >
                    <UiIcon size={26} name={'folder'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <h5>Современный офис</h5>
                <p>Современные офисы по всему миру. У нас царит командный дух и атмосфера путешествий, присоединяйтесь!</p>
            </div>
        </div>
    )
})
