'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {VacancyModel} from "shared/models";
import {UiLink, UiPage} from "shared/ui";
import {ROUTES} from "shared/contants";

import './index.scss';

type PropsType = {
    item: VacancyModel,
    template?: 'base' | 'light'
}

export const VmVacancy = observer(({item, template = 'base'}: PropsType) => {
    return (

        <UiLink  className="vm-vacancy"
                 href={ROUTES.VACANCY(item.slug)}>
            <div>
                <h5 className="vm-vacancy__title">{item.name}</h5>
                <p className="vm-vacancy__text">{item.description}</p>
            </div>
            <span className="vm-vacancy__salary">{item.salary}</span>
        </UiLink>

    )
})
