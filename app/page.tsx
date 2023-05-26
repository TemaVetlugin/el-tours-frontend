'use client';

import React, { useEffect } from "react";

import { useObservable, useObserve } from "shared/hooks";
import { bootstrapQuery } from "shared/queries/frontend";
import { CityService } from "shared/services";

export default function HomePage() {
    const store = useObservable({
        counter: 5
    });

    useEffect(() => {
        console.log(CityService.cities);
        (async () => {
            const response = await bootstrapQuery();
            console.log({response});
        })();
    }, []);

    return useObserve(() => (
        <main>
            Home Page
            <div>
                <p onClick={() => store.set("counter", store.counter + 1)}>
                    Get started {store.counter}&nbsp;
                </p>
                <div>
                    {CityService.city.name}
                </div>
            </div>
        </main>
    ))
}
