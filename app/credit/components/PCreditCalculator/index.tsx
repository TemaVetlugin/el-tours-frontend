'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiForm, UiIcon, UiInput, UiSelect } from "shared/ui";

import './index.scss';


export const PCreditCalculator = observer(() => {
    return (
        <UiForm className="p-credit-calculator">
            <div className="p-credit-calculator__wrap">
                <div>
                    <span className="p-credit-calculator__label">Срок рассрочки</span>
                    <UiSelect
                        className={"p-credit-calculator__select"}
                        items={[{
                            id: 1, name: <div>
                                <span>Последние</span>
                                <UiIcon size={[15, 10]} name={'arrowUp'}/>
                            </div>
                        }]}/>
                </div>
                <div>
                    <span className="p-credit-calculator__label">Стоимость услуги</span>
                    <UiInput
                        placeholder={"от 15 000 ₽ до 300 ₽"}
                        className={"p-credit-calculator__input"}
                    />
                </div>
            </div>
            <div className="p-credit-calculator__wrap">
                <div>
                    <span className="p-credit-calculator__label">Первый взнос</span>
                    <div className="p-credit-calculator__wrap--flex">
                    <UiSelect
                        placeholder={"0%"}
                        className={"p-credit-calculator__select--small"}
                        items={[{
                            id: 1, name: <div>
                                <span>Последние</span>
                                <UiIcon size={[15, 10]} name={'arrowUp'}/>
                            </div>
                        }]}/>
                    <UiInput
                        placeholder={"0 ₽"}
                        className={"p-credit-calculator__input--small"}
                    />
                    </div>
                </div>
                <div className="p-credit-calculator-price">
                    <span>Ежемесячные выплаты:</span>
                    <span className="p-credit-calculator-price__numbers">3 750 ₽</span>
                </div>
            </div>
        </UiForm>
    )
})
