'use client';

import React from "react";

import { useCity, useObservable, useObserve, useUser } from "shared/hooks";
import { LocationService, UserService } from "shared/services";
import { UiButton } from "shared/ui/UiButton";
import { UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";

export default function HomePage() {
    const store = useObservable({
        counter: 5
    });

    const city = useCity();
    const user = useUser();

    return useObserve(() => (
        <main>
            <UiButton label={'asdsa'}/>
            <UiButton label={'asdsa'} isLoading/>
            <UiButton label={'asdsa'} isDisabled/>
            <UiButton label={'asdsa'} size={'small'}/>
            <UiButton colors={{
                icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE]
            }}>
                <span>asdadasdasd</span>
                <UiIcon size={24} name={'catalogMenu'} color={COLORS.WHITE}/>
            </UiButton>
            <UiButton colors={{
                icon: [COLORS.WHITE, COLORS.GRAY_PRIMARY]
            }}>
                <span>asdadasdasd</span>
                <UiIcon size={24} name={'catalogMenu'} color={COLORS.WHITE}/>
            </UiButton>
            Home Page
            <div>
                <p onClick={() => store.set("counter", store.counter + 1)}>
                    Get started {store.counter}&nbsp;
                </p>
                <div>
                    {city.name}
                    {user.id}
                </div>
            </div>
        </main>
    ))
}
