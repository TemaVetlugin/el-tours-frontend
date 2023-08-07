'use client';

import { UiButton, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = 'Страница не найдена';
    }, []);
    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs items={[ROUTES.NOT_FOUND()]}/>
                <UiPage.Header title={'Страница не найдена'}/>
                <p>Ошибка 404: запрашиваемая вами страница не найдена</p>
                <br/>
                <UiButton label={'Перейти на главную'} href={ROUTES.HOME()}/>
            </UiPage.Wrap>
        </UiPage>
    );
}
