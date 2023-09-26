'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiForm } from "shared/ui";

import './index.scss';


export const PCompanyServices = observer(() => {
    return (
        <UiForm className="p-company-services">
            <div className="p-company-services__header">
                <h2>Компания</h2>
            </div>

            <div className="p-company-services-body">
                    <ul>
                        <li className="p-company-services__text">О компании</li>
                        <li className="p-company-services__text">Сотрудники</li>
                        <li className="p-company-services__text">Достижения</li>
                        <li className="p-company-services__text">Вакансии</li>
                    </ul>
            </div>
        </UiForm>
    )
})
