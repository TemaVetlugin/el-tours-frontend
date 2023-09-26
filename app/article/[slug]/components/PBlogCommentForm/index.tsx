'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiInput, UiTextarea } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PBlogCommentForm = observer(() => {
    return (

        <UiForm className="p-blog-form-comments-aside">
            <div className="p-blog-form-comments-aside__header">
                <h2>Оставьте свой комментарий!</h2>
                <span>Это не требует регистрации</span>
            </div>
            <div className="p-blog-form-comments-aside-body">

            <UiInput
                placeholder='Как вас зовут'
                name={'query'}
            />
            <UiInput
                placeholder='Ваш город'
                name={'query'}
            />
                <UiTextarea
                    placeholder='Комментарий'
                    name={'query'}></UiTextarea>
            </div>
            <UiButton className="p-blog-form-comments-aside__confirm" template={'large'} type={'submit'} colors={{
                button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                label: [COLORS.DARK_PRIMARY, COLORS.WHITE],
            }}>
                <span>Отправить</span>
            </UiButton>
        </UiForm>
    )
})
