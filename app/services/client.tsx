'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useSearchParams, useStore } from "shared/hooks";
import { ArticleModel, PageModel, PaginationModel } from "shared/models";
import { UiPage } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { UiCardWrap } from "shared/ui/UiCardsWrap";
import { VmService } from "shared/viewmodels/VmServices";
import { pageQuery } from "shared/queries/main";

export const Client = observer(() => {
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        page: new PageModel(),
        isLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
        activeSlide: 0,
        isShallowLoading: true,

    });

    const media: { id: number, type: 'small' | 'large', src?: string, flag?: string, weather?: string, views?: number, comments?: number, visa?: string, text?: string }[] = [
        {
            id: 1,
            type: 'large',
            src: '/assets/images/typical/image69.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 2, type: 'small', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', views: 12, comments: 21, text: 'text'},
        {
            id: 3,
            type: 'small',
            src: '/assets/images/typical/image150.png',
            visa: 'Шенгенская виза',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 4, type: 'small', src: '/assets/images/typical/image69.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 5, type: 'large', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 6, type: 'small', src: '/assets/images/typical/image150.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {
            id: 7,
            type: 'small',
            src: '/assets/images/typical/image69.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 8, type: 'small', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {
            id: 9,
            type: 'large',
            src: '/assets/images/typical/image150.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        // и т.д.
    ];

    const searchParams = useSearchParams({page: 1,})

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await pageQuery({
            url: ROUTES.SERVICES().url,
        });
        if (isSuccess && data) {
            store.set("page", new PageModel(data.item));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page]);

    return (
        <UiPage className="p-visas">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.HOME()}
                title={store.page.title}
                subtitle={store.page.subtitle}
            />
            <UiPage.Wrap className={'p-visas__wrap'}>
                {/*<UiDataBoundary isLoading={store.isLoading} withShallow>*/}
                <UiCardWrap className={"p-visas-cards"}>
                    {media.map((media) =>
                        <VmService
                            key={media.id}
                            country={media}
                        />)}
                </UiCardWrap>
                {/*</UiDataBoundary>*/}
            </UiPage.Wrap>


        </UiPage>
    )
});
