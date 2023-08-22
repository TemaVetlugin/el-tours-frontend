'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { BlogArticleModel } from "shared/models";
import { UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    item: BlogArticleModel,
    template?: 'base' | 'light'
}

export const CTileBlogArticle = observer(({ item, template = 'base' }: PropsType) => {
    return (
        <div className="c-tile-news">
            <UiLink
                className="c-tile-news__image"
                style={{ backgroundImage: `url(${item.previewImage})` }}
                href={ROUTES.NEWS(item.slug)}
            />
            <div className="c-tile-news__inner">
                <UiLink href={ROUTES.NEWS(item.slug)} className="c-tile-news__name">{item.name}</UiLink>
                {template === 'base' && (
                    <>
                        <div className="c-tile-news__preview">{item.preview}</div>
                        <UiPage.Link href={ROUTES.NEWS(item.slug)}>Читать</UiPage.Link>
                    </>
                )}
            </div>
        </div>
    )
})
