'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PBlogFormAside = observer(() => {
    return (
        <UiForm className="blog-form-aside">
            <div className="blog-form-aside__header">
                <h2>Хотите получать
                    самые интересные публикации?</h2>
                <p>Подпишитесь на нашу рассылку и раз в неделю мы будем присылать вам свежие статьи</p>
            </div>
            <p>Электронный адрес</p>
            <UiInput
                placeholder=''
                name={'query'}
            />
            <UiButton className="blog-form-aside__confirm" template={'large'} type={'submit'} colors={{
                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                label: [COLORS.WHITE, COLORS.WHITE],
            }}>
                <span>Подписаться</span>
            </UiButton>
        </UiForm>
    )
})
