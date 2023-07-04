'use client';

import React from "react";
import { UiPage } from "shared/ui";
import { observer } from "mobx-react-lite";
import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { PHomeBanners } from "./components/PHomeBanners";
import { PHomePromoActions } from "./components/PHomePromoActions";
import { useCity, useDidUpdateEffect, useObservable } from "shared/hooks";
import { BrandModel, HomeBannerModel, PromoActionModel } from "shared/models";
import { PHomeBrands } from "./components/PHomeBrands";

type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer(({ homeBanners, promoActions,brands }: PropsType) => {
    const city = useCity();

    const store = useObservable({
        homeBanners: homeBanners.map(item => new HomeBannerModel(item)),
        promoActions: promoActions.map(item => new PromoActionModel(item)),
        brands: brands.map(item => new BrandModel(item)),
    });

    useDidUpdateEffect(() => {
        (async () => {
            const { isSuccess, data } = await homeQuery({
                cityId: city.id
            });
            if (data && isSuccess) {
                store.set("homeBanners", data.homeBanners.map(item => new HomeBannerModel(item)))
                store.set("promoActions", data.promoActions.map(item => new PromoActionModel(item)))
                store.set("brands", data.brands.map(item => new BrandModel(item)))
            }
        })();
    }, [city])

    return (
        <UiPage>
            <UiPage.Wrap>
                <PHomeBanners homeBanners={store.homeBanners}/>
                <PHomePromoActions promoActions={store.promoActions}/>
                <PHomeBrands brands={store.brands}/>
            </UiPage.Wrap>
        </UiPage>
    );
});
