'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { ArticleModel } from "shared/models";
import { UiLink, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    item: ArticleModel,
    template?: 'base' | 'light'
}

export const VmArticle = observer(({ item, template = 'base' }: PropsType) => {
    return (
        <div className="vm-news">
            <UiLink
                className="vm-news__image"
                style={{ backgroundImage: `url(${item.previewImage})` }}
                href={ROUTES.ARTICLES(item.slug)}
            />
            <div className="vm-news__inner">
                <UiLink href={ROUTES.ARTICLES(item.slug)} className="vm-news__name">{item.name}</UiLink>
                {template === 'base' && (
                    <>
                        <div className="vm-news__preview">{item.preview}</div>
                        <UiPage.Link href={ROUTES.ARTICLES(item.slug)}>Читать</UiPage.Link>
                    </>
                )}
            </div>
        </div>
    )
})
