import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Script from "next/script";

import { Placemark } from './components/Placemark';

import './index.scss';

declare global {
    const ymaps: typeof import("yandex-maps"); // @types/yandex-maps
}

type PropsType = {
    location: [number, number],
    zoom?: number,
    children?: (map: ymaps.Map) => React.ReactNode
}

export const Map = observer((
    {
        children,
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
            const map = new ymaps.Map(ref.current, {
                center: location,
                zoom
            });
            setMap(map);
        });
    }
    return (
        <>
            <Script
                src={'https://api-maps.yandex.ru/2.1/?apikey=2d05c9fb-dfe4-494e-ad30-aaeaf5bf113d&lang=ru_RU'}
                onLoad={handleLoad}
            />
            <div
                ref={ref}
                className="ui-map"
                style={{ width: 600, height: 600 }}
            />
            {(map && children) && children(map)}
        </>
    )
});

export const UiMap = Object.assign(Map, {
    Placemark
})
