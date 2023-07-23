'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiTypography, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";

import './page.scss';
import { ContentPageModel, ContentPageModelInterface } from "shared/models";
import { useObservable } from "shared/hooks";
import { html } from "shared/utilities";


type PropsType = {
    contentPage: ContentPageModelInterface
}

export const Client = observer(({ contentPage }: PropsType) => {
    const store = useObservable({
        contentPage: new ContentPageModel(contentPage)
    })
    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.PAGE(store.contentPage.slug, store.contentPage.name)]}/>
                <UiPage.Header title={store.contentPage.name}/>
                <UiTypography className={'p-page'}>
                    {html(store.contentPage.content)}
                </UiTypography>
            </UiWrap>
        </UiPage>
    )
});
