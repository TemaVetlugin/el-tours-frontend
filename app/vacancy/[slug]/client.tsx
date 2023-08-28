'use client';

import React from "react";
import {UiButton, UiIcon, UiLink, UiPage, UiQuote} from "shared/ui";
import {observer} from "mobx-react-lite";

import {homeQuery} from "shared/queries/frontend";
import {ReturnType} from "shared/types";
import {useAsyncEffect, useCity, useDidUpdateEffect, useRouter, useStore} from "shared/hooks";
import {ArticleModel, BlogArticleModel, BrandModel, CatalogProductModel, HomeBannerModel, ManufacturerModel, NewsModel, PromoActionModel} from "shared/models";
import {COLORS, ROUTES} from "shared/contants";

import {PBlogMediasAside} from "./components/PBlogMediasAside";
import {PBlogFormAside} from "./components/PBlogFormAside";
import {PBlogCommentForm} from "./components/PBlogCommentForm";
import {PBlogComments} from "./components/PBlogComments";
import {UserService} from "shared/services";
import {blogArticlesGetQuery} from "shared/queries/main";
import {PBlogAuthor} from "./components/PBlogAuthor";
import {PBlogContent} from "./components/PBlogContent";

type PropsType = {
    slug: string
}
export const Client = observer(({slug}: PropsType
) => {
    const router = useRouter()
    const store = useStore({
        item: new BlogArticleModel(),
        other: [] as BlogArticleModel[],
        isLoading: true
    });

    useAsyncEffect(async () => {
        const {isSuccess, data} = await blogArticlesGetQuery({
            slug,
        });
        if (isSuccess && data) {
            store.set("item", new BlogArticleModel(data.item));
            store.set("other", data.other.map(item => new BlogArticleModel(item)));
        } else {
            router.push(ROUTES.NOT_FOUND());
            return;
        }
        store.set("isLoading", false);
    }, [slug, router]);

    return (
        <UiPage className="blog-article-page">
            <UiPage.Header
                title={store.item.name}
                subtitle={store.item.createdDate + " - Чтение " + store.item.readingTime}
                views={store.item.views}
                comments={21}
            />
            <UiPage.Wrap>
                <div className="blog-article-page-body">
                <PBlogMediasAside/>
                <div className="blog-article-page-content">
                    <PBlogAuthor/>
                    <PBlogContent content={store.item.content}/>
                </div>
                <PBlogFormAside/>
                </div>
            </UiPage.Wrap>
            <UiPage.Wrap>
                <div className="blog-article-page-body">
                <div className="blog-article-page__offset"></div>
                <div className="blog-article-page-content">
                    <PBlogComments/>
                </div>
                <PBlogCommentForm/>
                 </div>
            </UiPage.Wrap>
        </UiPage>
    );
});
