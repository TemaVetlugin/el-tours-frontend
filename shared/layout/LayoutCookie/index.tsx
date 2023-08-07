'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { useStore } from "shared/hooks";
import { UiButton, UiCard } from "shared/ui";
import { Cache } from "shared/utilities/client";

import './index.scss';

export const LayoutCookie = observer(() => {
    const store = useStore({
        isOpened: false,
    });

    useEffect(() => {
        (async () => {
            const isAccepted = await Cache.get<number>('LayoutCookie.isAccepted');
            store.set("isOpened", !isAccepted);
        })();
    }, [store]);

    const handleAccept = () => {
        Cache.set('LayoutCookie.isAccepted', 1);
        store.set("isOpened", false);
    }

    if (!store.isOpened) {
        return null;
    }

    return (
        <div className="layout-cookie">
            <UiCard className='layout-cookie__inner'>
                <div className="layout-cookie__description">
                    Сайт использует файлы cookie. Продолжая работу с сайтом, вы подтверждаете использование сайтом
                    cookies вашего браузера.
                </div>
                <UiButton label={'Хорошо'} style={{ minWidth: 130 }} onClick={handleAccept}/>
            </UiCard>
        </div>
    )
})
