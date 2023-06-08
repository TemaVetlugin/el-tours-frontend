'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiDataBoundary, UiGrid, UiLink, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CompilationModel } from "shared/models";
import { compilationsQuery } from "shared/queries/main";

import './page.scss';

type PropsType = {
    params: {
        slug?: string[]
    }
}

export default function StorePage({ params }: PropsType) {
    const city = useCity();
    const store = useObservable({
        isLoading: true,
        compilations: [] as CompilationModel[],
    });

    useAsyncEffect(async () => {
        store.set("isLoading", true);

        const { isSuccess, data } = await compilationsQuery({
            cityId: city.id
        });

        if (isSuccess && data) {
            store.set("compilations", data.items.map(item => new CompilationModel(item)));
        }

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
                    <UiGrid columns={4} gap={20}>
                        {store.compilations.map(compilation => (
                            <UiLink
                                href={ROUTES.COMPILATION(compilation.slug).url}
                                key={compilation.id}
                                className="p-compilations-item"
                                style={{
                                    backgroundImage: `url(${compilation.imageThumbnail})`
                                }}
                            >
                                <div className="p-compilations-item__name">
                                    {compilation.name}
                                </div>
                            </UiLink>
                        ))}
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}