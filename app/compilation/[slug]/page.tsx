'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CompilationModel } from "shared/models";
import { compilationsGetQuery } from "shared/queries/main";
import { CCatalog } from "shared/components/catalog";

import './page.scss';

type PropsType = {
    params: {
        slug: string
    }
}

export default function Page({ params }: PropsType) {
    const city = useCity();
    const store = useObservable({
        isLoading: true,
        compilation: new CompilationModel(),
    });

    useAsyncEffect(async () => {
        store.set("isLoading", true);

        const { isSuccess, data } = await compilationsGetQuery({
            slug: params.slug,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("compilation", new CompilationModel(data.item));
        }
        store.set("isLoading", false);
    }, [city]);

    return useObserve(() => (
        <UiPage className={'p-compilations'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.COMPILATIONS(),
                        ROUTES.COMPILATION(store.compilation.slug, store.compilation.name),
                    ]}
                />
                <UiDataBoundary isLoading={store.isLoading}>
                    {!store.isLoading && (
                        <CCatalog
                            title={store.compilation.name}
                            params={{
                                id: store.compilation.catalogProducts.map(catalogProduct => catalogProduct.id)
                            }}
                        />
                    )}
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}
