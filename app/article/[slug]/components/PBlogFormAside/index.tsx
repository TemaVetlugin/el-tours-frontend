'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiInput } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PBlogFormAside = observer(() => {
    return (
        <UiForm className="p-blog-form-aside">
            <div className="p-blog-form-aside__header">
                <h2>Хотите получать
                    самые интересные публикации?</h2>
                <p>Подпишитесь на нашу рассылку и раз в неделю мы будем присылать вам свежие статьи</p>
            </div>
            <UiInput
                placeholder='Электронный адрес'
                name={'query'}
            />
            <UiButton className="p-blog-form-aside__confirm" template={'large'} type={'submit'} colors={{
                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                label: [COLORS.WHITE, COLORS.WHITE],
            }}>
                <span>Подписаться</span>
            </UiButton>
        </UiForm>
    )
})
