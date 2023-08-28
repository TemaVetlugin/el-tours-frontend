'use client';

import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";

import {ROUTES} from "shared/contants";
import {useAsyncEffect, useCity, useStore, useRouter, useSearchParams} from "shared/hooks";
import {NewsModel, PaginationModel, TagModel, BlogArticleModel} from "shared/models";
import {newsQuery, blogArticlesQuery, tagsQuery} from "shared/queries/main";
import {CTileBlogArticle} from "shared/components/tiles";
import {UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap} from "shared/ui";

import './page.scss';
import {} from "shared/models/BlogArticle.model";
import {auto} from "@popperjs/core";
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "./components/PVacancyHeaderSearch";
import {PVacancyFormAside} from "./components/PVacancyFormAside";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        blogArticles: [] as BlogArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await blogArticlesQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("blogArticles", data.items.map(item => new BlogArticleModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                title={'Вакансии'}
                subtitle={'Возможно, нам не хватает именно тебя!'}
            />

            <div className="vacancy-page">
                <UiPage.Wrap className="vacancy-page--flex">
                    <div className="vacancy-page-body">
                        <p>Каждый день с нашей помощью более 10 000 человек планируют свои поездки: находят дешевые отели, билеты на самолет и бронируют круизы. В нашу дружную
                            команду
                            мы
                            ищем профессионалов, готовых участвовать в создании и поддержке продуктов для миллионов пользователей.</p>
                        <p>Мы ценим инициативу, не вставляем палки в колеса и даем возможность влиять на сервис. И каждое успешное решение мы отмечаем веселыми вечеринками!</p>
                    </div>
                    <PVacancyFormAside/>
                </UiPage.Wrap>
            </div>

        </UiPage>
    )
});
