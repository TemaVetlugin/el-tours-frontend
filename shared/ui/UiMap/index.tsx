import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Script from "next/script";
import classnames from "classnames";

import { Marker } from './components/Marker';

import './index.scss';

declare global {
    interface Window {
        ymaps: typeof import("yandex-maps")
    }
}

declare global {
    const ymaps: typeof import("yandex-maps"); // @types/yandex-maps
}

type PropsType = {
    className?: string
    location: [number, number],
    zoom?: number,
    render?: (map: ymaps.Map) => React.ReactNode
}

export const Map = observer((
    {
        render,
        className,
        location,
        zoom = 14
    }: PropsType
) => {
    const [map, setMap] = useState<ymaps.Map | null>(null)
    const ref = useRef<HTMLDivElement>(null)

    const handleLoad = () => {
        ymaps.ready(() => {
            if (!ref.current) {
                return;
            }
            setMap(new ymaps.Map(ref.current, {
                center: location,
                zoom
            }));
        });
    }

    useEffect(() => {
        if (map || !window?.ymaps || !ref.current) {
            return;
        }
        setMap(new ymaps.Map(ref.current, {
            center: location,
            zoom
        }));
    }, [ref, map, location, zoom]);

    useEffect(() => {
        if (!map) {
            return;
        }
        map.setZoom(zoom);
    }, [map, zoom]);

    useEffect(() => {
        if (!map) {
            return;
        }
        map.setCenter(location);
    }, [map, location])
    return (
        <>
            <Script
                src={'https://api-maps.yandex.ru/2.1/?apikey=2d05c9fb-dfe4-494e-ad30-aaeaf5bf113d&lang=ru_RU'}
                onLoad={handleLoad}
            />
            <div
                ref={ref}
                className={classnames('ui-map', className)}
            />
            {(map && render) && render(map)}
        </>
    )
});

export const UiMap = Object.assign(Map, {
    Marker
})
