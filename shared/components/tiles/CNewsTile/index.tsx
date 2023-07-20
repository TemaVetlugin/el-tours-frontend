'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { NewsModel } from "shared/models";
import { UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    value: NewsModel,
    template?: 'base' | 'light'
}

export const CTileNews = observer(({ value: news, template = 'base' }: PropsType) => {
    return (
        <div className="c-tile-news">
            <UiLink
                className="c-tile-news__image"
                style={{ backgroundImage: `url(${news.previewImage})` }}
                href={ROUTES.NEWS(news.slug)}
            />
            <div className="c-tile-news__inner">
                <UiLink className="c-tile-news__name">{news.name}</UiLink>
                {template === 'base' && (
                    <>
                        <div className="c-tile-news__preview">{news.preview}</div>
                        <UiPage.Link href={ROUTES.HOME().url}>Читать</UiPage.Link>
                    </>
                )}
            </div>
        </div>
    )
})
