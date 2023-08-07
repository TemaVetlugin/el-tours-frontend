'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useObservable, useRouter } from "shared/hooks";
import { UiButton, UiDataBoundary, UiGrid, UiIcon, UiPage, UiShare, UiTypography } from "shared/ui";
import { NewsModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { html } from "shared/utilities";
import { newsGetQuery } from "shared/queries/main";
import { CTileNews } from "shared/components/tiles";
import { CCatalogProductsSlider } from "shared/components/catalog";

type PropsType = {
    slug: string
}

export const Client = observer(({ slug }: PropsType) => {
    const store = useObservable({
        item: new NewsModel(),
        other: [] as NewsModel[],
        isLoading: true
    });
    const city = useCity();
    const router = useRouter();
    useAsyncEffect(async () => {
        const { isSuccess, data } = await newsGetQuery({
            slug,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("item", new NewsModel(data.item));
            store.set("other", data.other.map(item => new NewsModel(item)));
        } else {
            router.push(ROUTES.NOT_FOUND());
            return;
        }
        store.set("isLoading", false);
    }, [slug, city, router]);

    return (
        <UiPage className={'p-news-detail'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.NEWS(),
                        ROUTES.NEWS(store.item.slug, store.item.name)
                    ]}
                />
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiGrid columns='1fr 310px' gap={20}>
                        <div>
                            <UiPage.Header title={store.item.name}/>
                            <UiPage.Content>
                                <UiTypography>
                                    <div
                                        className={'p-news-detail__image'}
                                        style={{ backgroundImage: `url(${store.item.contentImage})` }}
                                    />
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
                                        <span>Все новости</span>
                                    </UiButton>
                                    <UiShare style={{ marginLeft: 'auto' }}/>
1                                </UiPage.Actions>
                            </UiPage.Content>
                        </div>
                        <UiPage.Aside title={'Другие новости'}>
                            {store.other.map(news => <CTileNews template={'light'} key={news.id} item={news}/>)}
                            <UiPage.Link href={ROUTES.NEWS()}>
                                Смотреть все
                            </UiPage.Link>
                        </UiPage.Aside>
                    </UiGrid>
                    {store.item.catalogProducts.length > 0 && (
                        <UiPage.Section title={'Товары в новости'}>
                            <CCatalogProductsSlider catalogProducts={store.item.catalogProducts}/>
                        </UiPage.Section>
                    )}
                </UiDataBoundary>
            </UiPage.Wrap>
        </UiPage>
    );
});
