'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { ROUTES } from "shared/contants";

import { useAsyncEffect, useCity, useStore } from "shared/hooks";
import { CompilationModel } from "shared/models";
import { compilationsQuery } from "shared/queries/main";
import { UiDataBoundary, UiGrid, UiLink, UiPage, UiWrap } from "shared/ui";

import './page.scss';


export const Client = observer(() => {
    const city = useCity();
    const store = useStore({
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

    return (
        <UiPage className={'p-compilations'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.COMPILATIONS()
                    ]}
                />
                <UiPage.Header title={'Подборки'}/>
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiGrid columns={4} gap={20}>
                        {store.compilations.map(compilation => (
                            <UiLink
                                href={ROUTES.COMPILATIONS(compilation.slug).url}
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
    );
});
