'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { CCatalogProductsSlider } from "shared/components/catalog";
import { CTileArticle } from "shared/components/tiles";
import { COLORS, ROUTES } from "shared/contants";

import { useAsyncEffect, useCity, useStore, useRouter } from "shared/hooks";
import { ArticleModel } from "shared/models";
import { articlesGetQuery } from "shared/queries/main";
import { UiButton, UiDataBoundary, UiGrid, UiIcon, UiPage, UiShare, UiTypography } from "shared/ui";
import { html } from "shared/utilities";

type PropsType = {
    slug: string
}

export const Client = observer(({ slug }: PropsType) => {
    const store = useStore({
        item: new ArticleModel(),
        other: [] as ArticleModel[],
        isLoading: true
    });
    const city = useCity();
    const router = useRouter();
    useAsyncEffect(async () => {
        const { isSuccess, data } = await articlesGetQuery({
            slug,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("item", new ArticleModel(data.item));
            store.set("other", data.other.map(item => new ArticleModel(item)));
        } else {
            router.push(ROUTES.NOT_FOUND())
            return;
        }
        store.set("isLoading", false);
    }, [slug, city, router]);

    return (
        <UiPage className={'p-articles-detail'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.ARTICLES(),
                        ROUTES.ARTICLES(store.item.slug, store.item.name)
                    ]}
                />
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiPage.Header title={store.item.name}/>
                    <UiGrid columns='1fr 316px' gap={124}>
                        <UiPage.Content>
                            <UiTypography>
                                <img src={store.item.contentImage} alt=""/>
                                {html(store.item.content)}
                            </UiTypography>
                            <UiPage.Actions>
                                <UiButton href={ROUTES.NEWS().url} size={"small"} colors={{
                                    icon: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                    border: [COLORS.TRANSPARENT, COLORS.TRANSPARENT]
                                }}>
                                    <UiIcon size={16} name={"chevronLeft"}/>
                                    <span>Все статьи</span>
                                </UiButton>
                                <UiShare style={{ marginLeft: 'auto' }}/>
                            </UiPage.Actions>
                        </UiPage.Content>
                        <UiPage.Aside title={'Другие статьи'}>
                            {store.other.map(news => <CTileArticle template={'light'} key={news.id} item={news}/>)}
                            <UiPage.Link href={ROUTES.NEWS()}>
                                Смотреть все
                            </UiPage.Link>
                        </UiPage.Aside>
                    </UiGrid>
                    {store.item.catalogProducts.length > 0 && (
                        <UiPage.Section title={'Товары в акции'}>
                            <CCatalogProductsSlider catalogProducts={store.item.catalogProducts}/>
                        </UiPage.Section>
                    )}
                </UiDataBoundary>
            </UiPage.Wrap>
        </UiPage>
    );
});
