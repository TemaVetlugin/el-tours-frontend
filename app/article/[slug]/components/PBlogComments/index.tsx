'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiLink } from "shared/ui";

import './index.scss';


export const PBlogComments = observer(() => {
    return (
        <div className="p-blog-comments">
            <h5 className="p-blog-comments__title">Комментарии (4):</h5>
            <div className="p-blog-comments__item">
                <div className="p-blog-comments__item__profile">
                    <img src={require('../../assets/authorPicture.png').default.src} alt="" className="p-blog-comments__item__profile__picture"/>
                    <div className="p-blog-comments__item__profile__descr">
                        <h5>Irishka Traveler</h5> <span>г. Москва</span>
                        <p>21 декабря 2018 в 22:57</p>
                    </div>
                </div>
                <div className="p-blog-comments__item__text">
                <p>Irishka Traveler, а как туда добраться на машине? От границы Беларуси ехать около часа на машине. Построить маршрут можете через наш сервис "Маршруты" и заодно
                    достопримечательности на маршруте подобрать. http://traveljay.ru/marshruti</p>
                </div>
                <UiLink>Ответить</UiLink>
            </div>
        </div>
    )
})
