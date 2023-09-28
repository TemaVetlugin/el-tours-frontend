'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import { UiForm } from "shared/ui";
import './index.scss';


export const PVisaServices = observer(() => {
    return (
        <UiForm className="p-visa-services">
            <div className="p-visa-services-header">
                <h2>Услуги</h2>
            </div>

            <div className="p-visa-services-body">
                    <ul>
                        <li className="p-visa-services__text">
                            Оформление визы
                        </li>
                        <li className="p-visa-services__text">Рассрочка и кредит</li>
                        <li className="p-visa-services__text">Страхование</li>
                        <li className="p-visa-services__text">Выбрать попутчика</li>
                        <li className="p-visa-services__text">Сим-карты</li>
                        <li className="p-visa-services__text">Подарочный сертификат</li>
                    </ul>
            </div>
        </UiForm>
    )
})
