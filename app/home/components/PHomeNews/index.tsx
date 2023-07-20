'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { NewsModel } from "shared/models";
import { UiGrid, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CTileNews } from "shared/components/tiles";

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
            <UiGrid columns={4} gap={20}>
                {news.slice(0, 4).map(item => <CTileNews key={item.id} item={item}/>)}
            </UiGrid>
        </UiPage.Section>
    )
})
