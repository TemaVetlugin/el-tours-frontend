'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useObservable, useRouter } from "shared/hooks";
import { UiButton, UiDataBoundary, UiIcon, UiPage, UiTypography } from "shared/ui";
import { ArticleModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { html } from "shared/utilities";
import { articlesGetQuery } from "shared/queries/main";
import { CCatalogProductsSlider } from "shared/components/catalog";
import { notFound } from "next/navigation";

type PropsType = {
    slug: string
}

export const Client = observer(({ slug }: PropsType) => {
    const store = useObservable({
        item: new ArticleModel(),
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
                        </UiPage.Actions>
                    </UiPage.Content>
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
