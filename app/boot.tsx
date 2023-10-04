'use client';

import { enableStaticRendering } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useCity, useDidUpdateEffect } from "shared/hooks";
import { bootQuery } from "shared/queries/frontend/boot.query";

import { AppService, CityService } from "shared/services";
import { UserService } from "shared/services/User.service";
import { ReturnType } from "shared/types";

enableStaticRendering(typeof window === "undefined");

type PropsType = {
    cityId: number,
    data?:  ReturnType<typeof bootQuery>['data']
}

const useConstructor = (callBack = () => {}): void => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) {
        return;
    }
    callBack();
    setHasBeenCalled(true);
}

export const Boot = ({ cityId, data }: PropsType) => {
    useConstructor(() => {
        AppService.boot(data);
        CityService.boot({cityId, ...data});
    });

    useEffect(() => {
        AppService.boot(data);
        UserService.boot();
    }, []);

    // render fix
    return (
        <div className='boot'>
            <BootHydrate/>
        </div>
    );
};

const BootHydrate = () => {
    const city = useCity();
    useDidUpdateEffect(() => {
        (async () => {
            const { data, isSuccess } = await bootQuery();
            if (data && isSuccess) {
                AppService.boot(data);
            }
        })();
    }, [city]);

    return (
        <div className='boot-hydrate'/>
    );
};

