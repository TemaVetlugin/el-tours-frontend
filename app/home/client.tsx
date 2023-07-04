'use client';

import React from "react";
import { UiPage } from "shared/ui";
import { observer } from "mobx-react-lite";
import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { PHomeBanners } from "./components/PHomeBanners";
import { useCity, useDidUpdateEffect, useObservable } from "shared/hooks";
import { HomeBannerModel } from "shared/models";

type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer(({ homeBanners }: PropsType) => {
    const city = useCity();

    const store = useObservable({
        homeBanners: homeBanners.map(homeBanner => new HomeBannerModel(homeBanner))
    });

    useDidUpdateEffect(() => {
        (async () => {
            const { isSuccess, data } = await homeQuery({
                cityId: city.id
            });
            if (data && isSuccess) {
                store.set("homeBanners", data.homeBanners.map(item => new HomeBannerModel(item)))
            }
        })();
    }, [city])

    return (
        <UiPage>
            <UiPage.Wrap>
                <PHomeBanners homeBanners={store.homeBanners}/>
            </UiPage.Wrap>
        </UiPage>
    );
});
