'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { ArticleModel } from "shared/models";
import { UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    item: ArticleModel,
    template?: 'base' | 'light'
}

export const CTileArticle = observer(({ item, template = 'base' }: PropsType) => {
    return (
        <UiLink href={ROUTES.ARTICLES(item.slug)} key={item.id} className="c-tile-article">
            <div
                className="c-tile-article__image"
                style={{ backgroundImage: `url(${item.previewImage})` }}
            />
            <div className="c-tile-article__name">{item.name}</div>
        </UiLink>
    )
})
