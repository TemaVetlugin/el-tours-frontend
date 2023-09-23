'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {UiForm, UiLink} from "shared/ui";

import './index.scss';


export const PVisaCountries = observer(() => {
    return (
        <UiForm className="p-visa-countries">
            <div className="p-visa-countries__header">
                <h2>Страны</h2>
            </div>

            <div className="p-visa-countries-body">
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
                <div className="p-visa-countries-body-list">
                    <div className="p-visa-countries-body-list__image"></div>
                    <span>Австралия</span>
                </div>
            </div>
            <UiLink>Все страны</UiLink>
        </UiForm>
    )
})
