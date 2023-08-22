'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { ArticleModel } from "shared/models";
import { UiGrid, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CTileArticle } from "shared/components/tiles";

type PropsType = {
    articles: ArticleModel[],
}

export const PHomeArticles = observer(({ articles }: PropsType) => {
    return (
        <UiPage.Section
            title={'Интересно'}
            link={(<UiPage.Link href={ROUTES.ARTICLES()}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={3} gap={20} className="">
                {articles.slice(0, 3).map(article => <CTileArticle key={article.id} item={article}/>)}
            </UiGrid>
        </UiPage.Section>
    )
})
