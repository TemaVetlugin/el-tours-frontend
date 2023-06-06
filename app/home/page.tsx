'use client';

import React from "react";

import { useCity, useObservable, useObserve, useUser } from "shared/hooks";
import { LocationService, UserService } from "shared/services";
import { UiButton } from "shared/ui/UiButton";
import { UiIcon, UiPage } from "shared/ui";
import { COLORS } from "shared/contants";

export default function HomePage() {
    const store = useObservable({
        counter: 5
    });

    const city = useCity();
    const user = useUser();

    return useObserve(() => (
        <UiPage>
            <UiPage.Title value={'Каталог'}/>

        </UiPage>
    ))
}
