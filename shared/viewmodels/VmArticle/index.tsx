'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import classnames from "classnames";

import {ArticleModelInterface} from "shared/models";
import {UiIcon, UiLink} from "shared/ui";
import {ROUTES} from "shared/contants";

import './index.scss';

type PropsType = {
    article: ArticleModelInterface,
}


export const VmArticle = observer(({article}: PropsType) => {

    const classNames = classnames('vm-article', `vm-article--${article.width === 2 ? 'large' : 'small'}`);

    return (
        <UiLink href={ROUTES.ARTICLES(article.slug).url} className={classNames} style={{backgroundImage: `url(${article.previewImage})`}}>

            <div className="vm-article-header">
                <div className="vm-article-header__item">
                    <UiIcon size={[24, 24]} name={"views"}/>
                    <span>{article.views}</span>
                </div>
                <div className="vm-article-header__item">
                    <UiIcon size={20} name={"comments"}/>
                    <span>21</span>
                </div>
            </div>
            <div className="vm-article__body">
                <span className="vm-article__country">{article.country}</span>
                <h3 className="vm-article__title">
                    {article.name}
                </h3>
                <span className="vm-article__description">
                    {`${article.createdDate} - Чтение ${article.readingTime}`}
                </span>
            </div>
        </UiLink>
    )
})
