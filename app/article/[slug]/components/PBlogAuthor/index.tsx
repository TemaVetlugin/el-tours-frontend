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


export const PBlogAuthor = observer(() => {
    return (
        <div className="p-blog-author">
            <div className="p-blog-author__profile">
                <img src={require('./assets/authorPicture.png').default.src} alt="" className="p-blog-author__profile__picture"/>
                <div className="p-blog-author__profile__descr">
                    <h5>Irishka Traveler</h5>
                    <p>г. Минск</p>
                </div>
            </div>
            <div className="p-blog-author__publications">
                <h5>28 публикаций</h5>
                <UiLink>Все публикации</UiLink>
            </div>

        </div>
    )
})
