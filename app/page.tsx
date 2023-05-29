'use client';

import React from "react";

import { useCity, useObservable, useObserve, useUser } from "shared/hooks";
import { CityService, UserService } from "shared/services";

export default function HomePage() {
    const store = useObservable({
        counter: 5
    });

    const city = useCity();
    const user = useUser();

    return useObserve(() => (
        <main>
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
