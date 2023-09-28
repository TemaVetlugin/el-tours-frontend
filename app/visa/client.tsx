'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "shared/hooks";
import { ArticleModel, PaginationModel } from "shared/models";
import { UiPage, UiTypography } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { UiCardWrap } from "shared/ui/UiCardsWrap";
import { PVisaSearch } from "./components/PVisaSearch";
import { VmVisa } from "shared/viewmodels/VmVisa";

export const Client = observer(() => {
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
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

    return (
        <UiPage className="p-visas">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.VISA()}
                title={'Визы в любую точку мира'}
            />
            <UiPage.Wrap className={'p-visas__wrap'}>
                <UiTypography>
                    <p>За 10 лет работы компании мы оформили уже более 4 500 тысяч виз для наших туристов и знаем все нюансы. Мы знаем, как подготовить документы и заполнить анкету
                        так, чтобы вам точно выдали визу с первого раза.</p>
                </UiTypography>
                <PVisaSearch/>
                {/*<UiDataBoundary isLoading={store.isLoading} withShallow>*/}
                <UiCardWrap className={"p-visas-cards"}>
                    {media.map((media) =>
                        <VmVisa
                            key={media.id}
                            country={media}
                        />)}
                </UiCardWrap>
                {/*</UiDataBoundary>*/}


            </UiPage.Wrap>


        </UiPage>
    )
});
