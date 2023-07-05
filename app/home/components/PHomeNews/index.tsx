'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { ArticleModel, NewsModel } from "shared/models";
import { UiGrid, UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    news: NewsModel[],
}

export const PHomeNews = observer(({ news }: PropsType) => {
    return (
        <UiPage.Section
            title={'Новости'}
            link={(<UiPage.Link href={ROUTES.HOME().url}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={4} gap={20} className="">
                {news.slice(0, 4).map(item => (
                    <div key={item.id} className="p-home-news-item">
                        <div
                            className="p-home-news-item__image"
                            style={{ backgroundImage: `url(${item.previewImage})` }}
                        />
                        <div className="p-home-news-item__inner">
                            <div className="p-home-news-item__name">{item.name}</div>
                            <div className="p-home-news-item__preview">{item.preview}</div>
                            <UiPage.Link href={ROUTES.HOME().url}>Читать</UiPage.Link>
                        </div>
                    </div>
                ))}
            </UiGrid>
        </UiPage.Section>
    )
})
