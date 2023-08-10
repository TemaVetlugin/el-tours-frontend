'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useStore, useRouter } from "shared/hooks";
import { UiButton, UiDataBoundary, UiGrid, UiIcon, UiPage, UiShare, UiTypography } from "shared/ui";
import { PromoActionModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { date, html } from "shared/utilities";
import { promoActionsGetQuery } from "shared/queries/main";
import { CCatalogProductsSlider } from "shared/components/catalog";

type PropsType = {
    slug: string
}

export const Client = observer(({ slug }: PropsType) => {
    const store = useStore({
        item: new PromoActionModel(),
        isLoading: true
    });
    const city = useCity();
    const router = useRouter();
    useAsyncEffect(async () => {
        const { isSuccess, data } = await promoActionsGetQuery({
            slug,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("item", new PromoActionModel(data.item));
        } else {
            router.push(ROUTES.NOT_FOUND());
            return;
        }
        store.set("isLoading", false);
    }, [slug, city, router]);

    return (
        <UiPage className={'p-promo-action'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.PROMO_ACTIONS(),
                        ROUTES.PROMO_ACTIONS(store.item.slug, store.item.name)
                    ]}
                />
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiPage.Content>
                        <UiGrid columns={'600px 1fr'} gap={24}>
                            <div
                                className={'p-promo-action__image'}
                                style={{ backgroundImage: `url(${store.item.contentImage})` }}
                            />
                            <div>
                                <UiPage.Actions>
                                    <UiButton href={ROUTES.PROMO_ACTIONS()} template={"small"} colors={{
                                        icon: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                        label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                        button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                        border: [COLORS.TRANSPARENT, COLORS.TRANSPARENT]
                                    }}>
                                        <UiIcon size={16} name={"chevronLeft"}/>
                                        <span>Все акции</span>
                                    </UiButton>
                                    <UiShare style={{marginLeft: 'auto'}}/>
                                </UiPage.Actions>
                                <UiPage.Header title={store.item.name}/>
                                {!!store.item.dateTo && (
                                    <div className="p-promo-action__date">Акция действует до {date(store.item.dateTo).toFormat('dd.MM.yyyy')}</div>
                                )}
                                <UiTypography>
                                    {html(store.item.content)}
                                </UiTypography>
                            </div>
                        </UiGrid>
                    </UiPage.Content>
                    <UiPage.Section title={'Акционные товары'}>
                        <CCatalogProductsSlider catalogProducts={store.item.catalogProducts}/>
                    </UiPage.Section>
                </UiDataBoundary>
            </UiPage.Wrap>
        </UiPage>
    );
});
