'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { MEDIA_POINTS, ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useStore } from "shared/hooks";
import { LicenseSectionModel } from "shared/models";
import { licenseSectionsQuery } from "shared/queries/main";
import { UiCard, UiGrid, UiLink, UiPage } from "shared/ui";

import "./page.scss";

export const Client = observer(() => {
    const store = useStore({
        isLoading: false,
        licenseSections: [] as LicenseSectionModel[]
    });

    const city = useCity();
    useAsyncEffect(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await licenseSectionsQuery({
            cityId: city.id
        });

        if (isSuccess && data) {
            store.set("licenseSections", data.items.map(item => new LicenseSectionModel(item)));
        }
        store.set("isLoading", false);
    }, [city]);

    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.LICENSES()]}/>
                <UiPage.Header title='Лицензии'/>
                <div className={'p-licenses'}>
                    {store.licenseSections.map((licenseSection) => (
                        <UiCard key={licenseSection.id} className={'p-licenses-item'}>
                            <h2 className="p-licenses-item__title">{licenseSection.name}</h2>
                            <div className="p-licenses-item__text">
                                {licenseSection.description}
                            </div>
                            <div className="p-licenses-item__documents">
                                {licenseSection.licenses.map((license) => (
                                    <div key={license.id} className="p-licenses-document">
                                        <p className="p-licenses-document__name">{license.name}</p>
                                        <div className="p-licenses-document__info">
                                            <div className="p-licenses-document__type">{license.media[0]?.extension}</div>
                                            <div className="p-licenses-document__size">{license.media[0]?.sizeFormatted}</div>
                                        </div>
                                        <UiLink
                                            target={'_blank'}
                                            href={license.file}
                                            className={'p-licenses-document__link underwave'}
                                        >
                                            Скачать
                                        </UiLink>
                                    </div>
                                ))}
                            </div>
                        </UiCard>
                    ))}
                </div>
            </UiPage.Wrap>
        </UiPage>
    )
});
