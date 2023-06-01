'use client';

import React from "react";

import { useCity, useObservable, useObserve, useUser } from "shared/hooks";
import { CityService, UserService } from "shared/services";
import { UiButton } from "shared/ui/UiButton";
import { UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";

export default function SearchPage() {
    const store = useObservable({
        counter: 5
    });

    const city = useCity();
    const user = useUser();

    return useObserve(() => (
        <main>
            SearchPage
        </main>
    ))
}
