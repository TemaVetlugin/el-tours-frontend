
type LayoutType = {}
interface IMap {
    [key: string]: any,
    new(id: HTMLDivElement, options: {
        center?: number[],
        zoom?: number
    }): IMap;

    geoObjects: {
        [key: string]: any,
        add: (geoObject: IPlacemark) => IMap
        remove: (geoObject: IPlacemark) => IMap
        removeAll: () => IMap
    }

    setZoom: (zoom: number) => void
}

interface IPlacemark {
    [key: string]: any,
    new(position: [number, number], properties: {
        [key: string]: any,
        balloonContentLayout?: LayoutType,
        balloonContent?: string,
        iconContent?: string
        iconCaption?: string
        iconCaptionContent?: string
        captionContent?: string
    }, options?: {
        [key: string]: any,
        iconLayout?: LayoutType,
        iconShape: {
            type: string,
            coordinates: number[],
            radius: number
        }
        preset?: string,
        iconColor?: string
    }): IPlacemark;
}

export type YMapsType = {
    [key: string]: any,
    Map: IMap,
    Placemark: IPlacemark,
    templateLayoutFactory: {
        createClass: (html: any, options?: {
            [key: string]: any
        }) => LayoutType
    }
}
