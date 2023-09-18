'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {ArticleModel, CatalogProductModel, PaginationModel} from "shared/models";
import {articlesQuery} from "shared/queries/main";
import {VmArticle} from "shared/viewmodels";
import {UiButton, UiDataBoundary, UiForm, UiGrid, UiIcon, UiInput, UiLightbox, UiLink, UiPage, UiSlider, UiTypography} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {COLORS, ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import classnames from "classnames";
import playImage from "../product/[slug]/assets/play.svg";
import {UserService} from "shared/services";
import {PVisaManager} from "./components/PVisaManager";
import {PVisaCountries} from "./components/PVisaCountries";
import {PVisaServices} from "./components/PVisaServices";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isLightbox: false,
        isShallowLoading: true,

    });

    const media = [
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        // и т.д.
    ];


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
        <UiPage className="p-tour">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.VISA()]}
                title={'Выберите тур в Грецию'}
                price={'от 12 330 ₽'}
                subtitle={'Шенгенские визы, мультивизы, приглашение для иностранцев'}

            />





        </UiPage>
    )
});
