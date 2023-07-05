'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { ArticleModel } from "shared/models";
import { UiGrid, UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    articles: ArticleModel[],
}

export const PHomeArticles = observer(({ articles }: PropsType) => {
    return (
        <UiPage.Section
            title={'Интересно'}
            link={(<UiPage.Link href={ROUTES.HOME().url}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={3} gap={20} className="">
                {articles.slice(0, 3).map(article => (
                    <UiLink href={ROUTES.HOME().url} key={article.id} className="p-home-articles-item">
                        <div
                            className="p-home-articles-item__image"
                            style={{ backgroundImage: `url(${article.previewImage})` }}
                        />
                        <div className="p-home-articles-item__name">{article.name}</div>
                    </UiLink>
                ))}
            </UiGrid>
        </UiPage.Section>
    )
})
