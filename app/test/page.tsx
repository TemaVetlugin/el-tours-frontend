'use client';

import React from "react";

import { useObservable, useObserve } from "shared/hooks";
import { UiPage } from "shared/ui";

export default function TestPage() {
    const store = useObservable({
        count: 1
    })

    return useObserve(() => (
        <UiPage>
            <UiPage.Title value={'Каталог'}/>
            <div onClick={() => store.set("count", store.count - 1)}>button</div>
        </UiPage>
    ))
}
