'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useCity, useRouter, useSearchParams, useStore } from "shared/hooks";
import { ArticleModel, PaginationModel } from "shared/models";
import { UiPage } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { VmCatalogHotel } from "shared/viewmodels";
import { HotelService } from "shared/services";

import './page.scss';

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        isLoading: true,
        isLightbox: false,
        isShallowLoading: true,
    });
    console.log(HotelService);

    const searchParams = useSearchParams({page: 1, tagId: null as null | number})

    return (
        <UiPage className="p-tour">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.VISA()}
                title={'Выберите тур в Грецию'}
                subtitle={'Шенгенские визы, мультивизы, приглашение для иностранцев'}
            />
            <UiPage.Wrap>
                <UiPage.Main>
                    {HotelService.hotels.map((hotel) =>
                        <VmCatalogHotel
                            key={hotel.id}
                            hotel={hotel}
                        />)}
                </UiPage.Main>
            </UiPage.Wrap>

        </UiPage>
    )
});
