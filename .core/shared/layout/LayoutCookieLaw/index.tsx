import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { UiButton, UiCard } from "shared/uikit";

import { useObservable } from "shared/hooks";

import image from './assets/image.svg';
import './index.scss';
import { Cache } from "shared/utilities";

export const LayoutCookieLaw = observer(() => {
    const store = useObservable({
        isOpened: false,
    });

    useEffect(() => {
        (async () => {
            const isAccepted = await Cache.get('LayoutCookieLaw.isAccepted', 0);
            store.set("isOpened", !isAccepted);
        })();
    }, [store]);

    const handleAccept = () => {
        Cache.set('LayoutCookieLaw.isAccepted', 1);
        store.set("isOpened", false);
    }

    if (!store.isOpened) {
        return null;
    }

    return (
        <div className="layout-cookie-law">
            <UiCard className='layout-cookie-law__inner'>
                <img src={image.src} alt=""/>
                <div className="layout-cookie-law__description">
                    Сайт использует файлы cookie. Продолжая работу с сайтом, вы подтверждаете использование сайтом
                    cookies вашего браузера.
                </div>
                <UiButton label={'Хорошо'} style={{ minWidth: 130 }} onClick={handleAccept}/>
            </UiCard>
        </div>
    )
})

