'use client';

import React from "react";

import { useObservable, useObserve } from "shared/hooks";
import { UiPage } from "shared/ui";
import { UiMap } from "shared/ui/UiMap";

export default function TestPage() {
    const store = useObservable({
        count: 1
    })

    return useObserve(() => (
        <UiPage>
            <UiPage.Title value={'Каталог'}/>
            <div onClick={() => store.set("count", store.count - 1)}>button</div>
            <UiMap location={[55.76, 37.56]}>
                {(map) => (
                    <>
                        <UiMap.Placemark
                            map={map}
                            location={[55.76, 37.56]}
                            render={() => (
                                <div onClick={() => store.set("count", store.count + 1)}>
                                    count: {store.count}
                                </div>
                            )}
                        />
                    </>
                )}
            </UiMap>
        </UiPage>
    ))
}
