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
        <div className="c-tile-blog">
            <UiLink
                className="c-tile-blog__image__2"
                style={{ backgroundImage: `url(${item.previewImage})` }}
                href={ROUTES.BLOG(item.slug)}
            />
            <div className="c-tile-blog__inner">
                <UiLink href={ROUTES.BLOG(item.slug)} className="c-tile-blog__name">{item.name}</UiLink>
                {template === 'base' && (
                    <>
                        <div className="c-tile-blog__preview">{item.preview}</div>
                        <UiPage.Link href={ROUTES.BLOG(item.slug)}>Читать</UiPage.Link>
                    </>
                )}
            </div>
        </div>
    )
})
