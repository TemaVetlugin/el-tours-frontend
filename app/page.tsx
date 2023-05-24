'use client';

import React, { useEffect } from "react";

import { useObservable, useObserve } from "shared/hooks";
import { bootstrapQuery } from "shared/queries/frontend";
import { Cache } from "shared/utilities/client";
import { CityService } from "shared/services/City.service";

export default function HomePage() {
    const store = useObservable({
        counter: 5
    });

    useEffect(() => {
        console.log(CityService.cities);
        (async () => {
            const response = await Cache.remember('layout', async () => await bootstrapQuery(), 1000);
            console.log(response);
        })();
    }, []);

    return useObserve(() => (
        <main>
            Home Page
            <div>
                <p onClick={() => store.set("counter", store.counter + 1)}>
                    Get started {store.counter}&nbsp;
                </p>
                {CityService.cities.map(city => (
                    <div key={city.id} onClick={() => city.update({name: Date.now()})}>
                        {city.name}
                    </div>
                ))}
            </div>
        </main>
    ))
}
