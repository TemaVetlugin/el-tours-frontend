'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiForm } from "shared/ui";

import './index.scss';


export const PCreditCalculator = observer(() => {
    return (
        <UiForm className="p-credit-services">
            <div className="p-credit-services-header">
                <h2>Услуги</h2>
            </div>

            <div className="p-credit-services-body">
                    <ul>
                        <li className="p-credit-services__text">
                            Оформление визы
                        </li>
                        <li className="p-credit-services__text">Рассрочка и кредит</li>
                        <li className="p-credit-services__text">Страхование</li>
                        <li className="p-credit-services__text">Выбрать попутчика</li>
                        <li className="p-credit-services__text">Сим-карты</li>
                        <li className="p-credit-services__text">Подарочный сертификат</li>
                    </ul>
            </div>
        </UiForm>
    )
})
