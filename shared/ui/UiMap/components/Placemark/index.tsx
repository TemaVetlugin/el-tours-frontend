import React, { ReactElement, useEffect, useState } from "react";
import { Observer, observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import { v4 } from 'uuid';

import './index.scss';

type PropsType = {
    map: ymaps.Map,
    location: [number, number],
    render?: () => ReactElement
}

export const Placemark = observer((
    { map, render, location }: PropsType
) => {
    const [portal, setPortal] = useState<React.ReactPortal | null>(null)

    useEffect(() => {
        const markerId = `ui-map-marker-${v4()}`;
        const balloonContentLayout = ymaps.templateLayoutFactory.createClass(
            `<div id="${markerId}"></div>`, {
                build: function () {
                    (this as any).constructor.superclass.build.call(this);
                    const element = document.getElementById(markerId);
                    if (render && element) {
                        setPortal(createPortal((<Observer render={render}/>), element));
                    }
                },
            }
        );
        const placemark = new ymaps.Placemark(location, {}, {
            balloonContentLayout
        });
        map.geoObjects.add(placemark)
    }, [map, render]);

    return portal;
});
