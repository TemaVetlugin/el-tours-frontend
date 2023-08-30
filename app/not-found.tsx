'use client';

import { UiButton, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";
import React, { useEffect } from "react";
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";

export default function NotFound() {
    useEffect(() => {
        document.title = 'Страница не найдена';
    }, []);
    return (
        <>
        <UiPage>
                <LayoutHeader>
                    <LayoutHeaderSearch/>
                </LayoutHeader>
                <UiPage.Header title={'Страница не найдена'}/>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.NOT_FOUND()]}/>
                <p>Ошибка 404: запрашиваемая вами страница не найдена</p>
                <br/>
                <UiButton label={'Перейти на главную'} href={ROUTES.HOME()}/>
            </UiPage.Wrap>
        </UiPage>
        </>
    );
}
