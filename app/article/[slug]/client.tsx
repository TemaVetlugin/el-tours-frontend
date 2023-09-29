'use client';

import React from "react";
import { UiButton, UiDataBoundary, UiIcon, UiLink, UiPage, UiTypography } from "shared/ui";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useRouter, useStore } from "shared/hooks";
import { ArticleModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { PBlogMediasAside } from "./components/PBlogMediasAside";
import { PBlogFormAside } from "./components/PBlogFormAside";
import { PBlogCommentForm } from "./components/PBlogCommentForm";
import { articlesGetQuery } from "shared/queries/main";
import { LayoutHeader } from "shared/layout";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { html } from "shared/utilities";
import { UserService } from "shared/services";

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
                backTo={ROUTES.ARTICLES()}
                title={store.item.name}
                subtitle={
                    <div className={"p-article-subtitle"}>
                        <span>{store.item.createdDate + " - Чтение " + store.item.readingTime}</span>
                        <div className="p-article-subtitle-properties">
                            <div className="p-article-subtitle-properties__item">
                                <UiIcon size={[24, 24]} name={"views"}/>
                                <span>{store.item.views}</span>
                            </div>
                            <div className="p-article-subtitle-properties__item">
                                <UiIcon size={[24, 24]} name={"views"}/>
                                <span>{store.item.views}</span>
                            </div>
                        </div>
                    </div>
                }
            />
            <UiPage.Wrap template={'aside'} className="p-article-body">
                <UiPage.Main>
                    <PBlogMediasAside/>
                    <div className="p-article-author">
                        <div className="p-article-author-profile">
                            <img src={require('./assets/authorPicture.png').default.src} alt="" className="p-article-author-profile__picture"/>
                            <div className="p-article-author-profile__descr">
                                <h5>Irishka Traveler</h5>
                                <p>г. Минск</p>
                            </div>
                        </div>
                        <div className="p-article-author__publications">
                            <h5>28 публикаций</h5>
                            <UiLink>Все публикации</UiLink>
                        </div>
                    </div>
                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        <div className="p-article-content">
                            <UiTypography>
                                {html(store.item.content)}
                            </UiTypography>

                            <div className="p-article-content-like">
                                <span>Лайкнуть - это модно!</span>
                                <div className="p-article-content-like__count">
                                    <p>Понравилось: 283</p>
                                    <UiButton
                                        template={'icon'}
                                        colors={{
                                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                            border: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                                            icon: [COLORS.WHITE, COLORS.WHITE],
                                        }}
                                    >
                                        <UiIcon size={15} name={'like'} color={COLORS.GREEN_PRIMARY}/>
                                    </UiButton>
                                </div>
                            </div>
                        </div>
                    </UiDataBoundary>
                </UiPage.Main>
                <UiPage.Aside>
                    <PBlogFormAside/>
                </UiPage.Aside>
            </UiPage.Wrap>
            <UiPage.Wrap template={'aside'} className="p-article-body">

                <UiPage.Main>
                    <div className="p-article-comments">
                        <h5 className="p-article-comments__title">Комментарии (4):</h5>
                        <div className="p-article-comments-item">
                            <div className="p-article-comments-item-profile">
                                {/*<div className="p-article-comments-item-profile__picture" style={{backgroundImage: 'url(/assets/authorPicture.png)'}}></div>*/}
                                <img src={require('./assets/authorPicture.png').default.src} alt="" className="p-article-author-profile__picture"/>
                                <div className="p-article-comments-item-profile__description">
                                    <h5>Irishka Traveler</h5> <span>г. Москва</span>
                                    <p>21 декабря 2018 в 22:57</p>
                                </div>
                            </div>
                            <div className="p-article-comments-item__text">
                                <p>Irishka Traveler, а как туда добраться на машине? От границы Беларуси ехать около часа на машине. Построить маршрут можете через наш сервис
                                    "Маршруты" и заодно
                                    достопримечательности на маршруте подобрать. http://traveljay.ru/marshruti</p>
                            </div>
                            <UiLink>Ответить</UiLink>
                        </div>
                    </div>
                </UiPage.Main>
                <UiPage.Aside>
                    <PBlogCommentForm/>
                </UiPage.Aside>
            </UiPage.Wrap>
        </UiPage>
    );
});
