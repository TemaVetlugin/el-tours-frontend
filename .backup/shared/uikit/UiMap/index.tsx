import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { v4 } from 'uuid';

import { YandexMapModule } from "shared/modules";
import { ChangeHandlerType, ReturnType, YMapsType } from "shared/types";
import { StoreModel } from "shared/models";
import { useObservable } from "shared/hooks";

import { createStoreMarker } from "./utilities/createStoreMarker";

import './index.scss';

type PropsType = {
    children?: (options: { ymaps: YMapsType, map: YMapsType['Map'] }) => React.ReactNode,
    style?: CSSProperties,
    stores?: {
        items: StoreModel[],
        value?: number | null,
        onChange?: ChangeHandlerType<number>,
        content?: (storeId: number) => string,
    },
    location?: number[],
    zoom?: number
}

export const UiMap = observer((
    {
        style,
        children,
        location = [55.76, 37.64],
        zoom = 7,
        stores,
    }: PropsType
) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ymaps, setYmaps] = useState<YMapsType | null>(null);
    const [map, setMap] = useState<YMapsType['Map'] | null>(null);
    const store = useObservable({
        storeMarkers: [] as ReturnType<typeof createStoreMarker>[]
    });

    useEffect(() => {
        const key = v4();
        YandexMapModule.onLoad(key, (ymaps) => {
            if (ref.current) {
                ref.current.innerHTML = ''; //clear old map if existed
            }
            setYmaps(ymaps);
            if (!ref.current) {
                return;
            }
            const map = new ymaps.Map(ref.current, {
                center: location,
                zoom
            });
            setMap(map);
        });

        return () => {
            delete YandexMapModule.callbacks[key]; //fix for react.strict mode
        }
    }, []);

    useEffect(() => {
        map?.setCenter(location);
        map?.setZoom(zoom);
    }, [location, zoom]);

    useEffect(() => {
        if (!ymaps || !map || !stores || !(stores?.items?.length)) {
            return;
        }
        const clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedBlueClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: true,
            geoObjectHideIconOnBalloonOpen: true
        })
        const { items, content, value, onChange } = stores;
        store.set("storeMarkers", items.map(store => createStoreMarker({
            ymaps,
            store,
            content,
            value,
            onChange
        })));
        clusterer.add(store.storeMarkers.map((marker) => marker.placemark));
        map.geoObjects.add(clusterer);
        return () => {
            map.geoObjects.remove(clusterer);
            store.set("storeMarkers", []);
        }
    }, [map, stores?.items, ymaps]);

    useEffect(() => {
        if (!ymaps || !map || !stores || !stores.value) {
            return;
        }
        store.storeMarkers.forEach(marker => marker.update(stores.value))
    }, [store, stores?.value])

    return (
        <>
            {(ymaps && map && children) && children({ ymaps, map })}
            <div ref={ref} className="ui-map" style={style}/>
        </>
    )
});
