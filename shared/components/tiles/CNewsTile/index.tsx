'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { NewsModel } from "shared/models";
import { UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    value: NewsModel,
}

export const CTileNews = observer(({ value: news }: PropsType) => {
    return (
        <div className="c-tile-news">
            <div
                className="c-tile-news__image"
                style={{ backgroundImage: `url(${news.previewImage})` }}
            />
            <div className="c-tile-news__inner">
                <div className="c-tile-news__name">{news.name}</div>
                <div className="c-tile-news__preview">{news.preview}</div>
                <UiPage.Link href={ROUTES.HOME().url}>Читать</UiPage.Link>
            </div>
        </div>
    )
})
