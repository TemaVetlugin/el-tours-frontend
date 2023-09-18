'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {ArticleModel, PaginationModel} from "shared/models";
import {articlesQuery} from "shared/queries/main";
import {VmArticle, VmWorker} from "shared/viewmodels";
import {UiDataBoundary, UiGrid, UiIcon, UiPage} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import {UiCardWrap} from "shared/ui/UiCardsWrap";
import {VmCard} from "shared/viewmodels/VmCard";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await articlesQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("articles", data.items.map(item => new ArticleModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage className={"p-article"}>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.ARTICLES()]}
                title={'Блог'}
                subtitle={'Здесь собраны самые впечатляющие статьи путешественников.'}

            />
            <UiPage.Wrap>
                <UiDataBoundary isLoading={store.isLoading} withShallow>
                    <UiCardWrap className={"p-article-card__wrap"}>
                        {store.articles.map((article) =>
                            <VmCard key={article.id}
                                    className={"p-article-card"}
                                    template={article.width === 2 ? 'large' : 'small'}
                                    background={article.previewImage}
                                    href={ROUTES.ARTICLES(article.slug).url}
                                    header={<>
                                        <div className="p-article-card-header__item">
                                            <UiIcon size={[24, 24]} name={"views"}/>
                                            <span>{article.views}</span>
                                        </div>
                                        <div className="p-article-card-header__item">
                                            <UiIcon size={20} name={"comments"}/>
                                            <span>21</span>
                                        </div>
                                    </>}
                                    body={
                                        <div>
                                            <span className="p-article-card__country">
                                                 {article.country}
                                            </span>
                                            <h3 className="p-article-card__title">
                                                {article.name}
                                            </h3>
                                            <span className="p-article-card__description">
                                                {article.createdDate + " - Чтение " + article.readingTime}
                                            </span>
                                        </div>
                                    }

                            />)}

                    </UiCardWrap>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiPage.Wrap>
        </UiPage>
    )
});
