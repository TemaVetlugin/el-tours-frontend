'use client';

import React from "react";
import {UiDataBoundary, UiPage} from "shared/ui";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useRouter, useStore} from "shared/hooks";
import {ArticleModel} from "shared/models";
import {ROUTES} from "shared/contants";

import {PBlogMediasAside} from "./components/PBlogMediasAside";
import {PBlogFormAside} from "./components/PBlogFormAside";
import {PBlogCommentForm} from "./components/PBlogCommentForm";
import {PBlogComments} from "./components/PBlogComments";
import {articlesGetQuery} from "shared/queries/main";
import {PBlogAuthor} from "./components/PBlogAuthor";
import {PBlogContent} from "./components/PBlogContent";
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";

type PropsType = {
    slug: string
}
export const Client = observer(({slug}: PropsType
) => {
    const router = useRouter()
    const store = useStore({
        item: new ArticleModel(),
        other: [] as ArticleModel[],
        isLoading: true
    });

    useAsyncEffect(async () => {
        const {isSuccess, data} = await articlesGetQuery({
            slug,
        });
        if (isSuccess && data) {
            store.set("item", new ArticleModel(data.item));
            store.set("other", data.other.map(item => new ArticleModel(item)));
        } else {
            router.push(ROUTES.NOT_FOUND());
            return;
        }
        store.set("isLoading", false);
    }, [slug, router]);

    return (
        <UiPage className="p-article">

            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[
                    ROUTES.ARTICLES(),
                    ROUTES.ARTICLES(store.item.slug, store.item.name)
                ]}
                title={store.item.name}
                subtitle={store.item.createdDate + " - Чтение " + store.item.readingTime}
                views={store.item.views}
                comments={21}
            />
            <UiPage.Wrap>
                <div className="p-article-body">
                <PBlogMediasAside/>
                <div className="p-article-content">
                    <PBlogAuthor/>
                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                    <PBlogContent content={store.item.content}/>
                    </UiDataBoundary>
                </div>
                <PBlogFormAside/>
                </div>
            </UiPage.Wrap>
            <UiPage.Wrap>
                <div className="p-article-body">
                <div className="p-article__offset"></div>
                <div className="p-article-content">
                    <PBlogComments/>
                </div>
                <PBlogCommentForm/>
                 </div>
            </UiPage.Wrap>
        </UiPage>
    );
});
