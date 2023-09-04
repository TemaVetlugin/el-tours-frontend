'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiLink, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PVisaCountries = observer(() => {
    return (
        <UiForm className="visa-countries">
            <div className="visa-countries__header_image"></div>
            <div className="visa-countries__header">
                <h2>Страны</h2>
            </div>

            <div className="visa-countries-body">
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
                <div className="visa-countries-body__list">
                    <div className="visa-countries-body__list--image"></div>
                    <span>Австралия</span>
                </div>
            </div>
            <UiLink>Все страны</UiLink>
        </UiForm>
    )
})
