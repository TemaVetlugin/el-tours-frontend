'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiDataBoundary, UiGrid, UiLink, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CompilationModel } from "shared/models";
import { compilationsGetQuery, compilationsQuery } from "shared/queries/main";

import './page.scss';

type PropsType = {
    params: {
        slug: string
    }
}

export default function CompilationPage({ params }: PropsType) {
    const city = useCity();
    const store = useObservable({
        isLoading: true,
        compilation: new CompilationModel(),
    });

    useAsyncEffect(async () => {
        store.set("isLoading", true);

        const { isSuccess, data } = await compilationsGetQuery(params);


        store.set("isLoading", false);
    }, [city.id]);

    return useObserve(() => (
        <UiPage className={'p-compilations'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.COMPILATIONS(),
                    ]}
                />
                <UiPage.Title value={'Подборки'}/>
                <UiDataBoundary isLoading={store.isLoading}>

                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}
