'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CCatalog } from "shared/components/catalog";
import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useStore, useRouter } from "shared/hooks";
import { CompilationModel } from "shared/models";
import { compilationsGetQuery } from "shared/queries/main";
import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";

import './page.scss';

type PropsType = {
    slug: string
}

export const Client = observer(({ slug }: PropsType) => {
    const city = useCity();
    const router = useRouter();
    const store = useStore({
        isLoading: true,
        compilation: new CompilationModel(),
    });

    useAsyncEffect(async () => {
        store.set("isLoading", true);

        const { isSuccess, data } = await compilationsGetQuery({
            slug: slug,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("compilation", new CompilationModel(data.item));
        } else {
            router.notFound();
        }
        store.set("isLoading", false);
    }, [city, slug]);

    return (
        <UiPage className={'p-compilations'}>
            <UiWrap>
                <UiDataBoundary isLoading={store.isLoading}>
                    <UiPage.Breadcrumbs
                        items={[
                            ROUTES.COMPILATIONS(),
                            ROUTES.COMPILATIONS(store.compilation.slug, store.compilation.name),
                        ]}
                    />
                    {(!store.isLoading && store.compilation.catalogProducts.length > 0) && (
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
    );
});
