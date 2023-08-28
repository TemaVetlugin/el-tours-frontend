'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import { html } from "shared/utilities";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiLink, UiQuote, UiSlider, UiTypography} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";

type PropsType = {
    content?: string,
}
export const PBlogContent = observer(({content}: PropsType) => {
    return (
        <div className="blog-content">
            <UiTypography>
            {html(content)}
            </UiTypography>

            <div className="blog-content__like">
                <span>Лайкнуть - это модно!</span>
                <div className="blog-content__like__count">
                    <p>Понравилось: 283</p>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            border: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'like'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
            </div>
        </div>
    )
})
