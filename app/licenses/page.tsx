'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { UiCard, UiGrid, UiLink, UiPage } from "shared/ui";
import { MEDIA_POINTS, ROUTES } from "shared/contants";

import "./page.scss";

export default observer(function LicensesPage() {

    const licenses = [
        {
            title: 'На фармдеятельность',
            text: 'Etiam eu vehicula lectus, eget rutrum lectus. Nunc vehicula sem at pulvinar varius. Mauris rutrum mauris et nisl porttitor, in facilisis diam faucibus. Vivamus tellus purus, vehicula eu blandit sed, tempus ac dolor. Nulla facilisi. Vestibulum quis vehicula odio. Cras et quam egestas, iaculis neque nec, venenatis libero. Praesent metus mi, porttitor eu euismod nec, feugiat vitae ligula. Fusce ac auctor diam, sit amet cursus elit. Aliquam eget ante id mi rutrum efficitur et hendrerit est. Donec sollicitudin sem eu nisl congue, et pellentesque ligula elementum. Curabitur a lectus augue. In enim nisl, dictum sed suscipit id, imperdiet eu mauris.',
            documents: [
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
            ],
        },
        {
            title: 'На дистанционную торговлю',
            text: 'Etiam eu vehicula lectus, eget rutrum lectus. Nunc vehicula sem at pulvinar varius. Mauris rutrum mauris et nisl porttitor, in facilisis diam faucibus. Vivamus tellus purus, vehicula eu blandit sed, tempus ac dolor. Nulla facilisi. Vestibulum quis vehicula odio. Cras et quam egestas, iaculis neque nec, venenatis libero. Praesent metus mi, porttitor eu euismod nec, feugiat vitae ligula. Fusce ac auctor diam, sit amet cursus elit. Aliquam eget ante id mi rutrum efficitur et hendrerit est. Donec sollicitudin sem eu nisl congue, et pellentesque ligula elementum. Curabitur a lectus augue. In enim nisl, dictum sed suscipit id, imperdiet eu mauris.',
            documents: [
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
                {
                    name: 'Название документа',
                    href: '#',
                    type: 'PDF',
                    size: '5,4 Мб',
                },
            ],
        },
    ];

    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.LICENSES()]}/>
                <UiPage.Header title='Лицензии'/>
                <UiGrid className={'p-licenses'}
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1 },
                            [MEDIA_POINTS.IS_1024]: { columns: '868px' },
                        }}
                >
                    <UiGrid
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                            [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 40 },
                        }}
                    >
                        {
                            licenses.map((license, index) => {
                                return (
                                    <UiCard key={index} className={'p-licenses-item'}>
                                        <h2 className="p-licenses-item__title">{license.title}</h2>
                                        <div className="p-licenses-item__text">
                                            <p>{license.text}</p>
                                        </div>
                                        <div className="p-licenses-item__documents">
                                            {
                                                license.documents.map((document, index) => {
                                                    return (
                                                        <div key={index} className="p-licenses-document">
                                                            <p className="p-licenses-document__name">{document.name}</p>
                                                            <div className="p-licenses-document__info">
                                                                <div
                                                                    className="p-licenses-document__type">{document.type}</div>
                                                                <div
                                                                    className="p-licenses-document__size">{document.size}</div>
                                                            </div>
                                                            <UiLink
                                                                href={document.href}
                                                                className={'p-licenses-document__link underwave'}
                                                            >
                                                                Скачать
                                                            </UiLink>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </UiCard>
                                )
                            })
                        }
                    </UiGrid>
                </UiGrid>
            </UiPage.Wrap>
        </UiPage>
    )
});
