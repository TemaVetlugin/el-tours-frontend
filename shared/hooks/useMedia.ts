import { useEffect, useMemo, useState } from "react";

import { MediaPointType } from "shared/types";
import { MEDIA_POINTS } from "shared/contants";

type UseMediaEntryType<T> = Record<MediaPointType, T>;
type UseMediaReturnType<T> = Record<`is${MediaPointType}`, T>;
type UseMediaResultType = UseMediaReturnType<boolean>
type UseMediaResultWithValueType<T> = UseMediaReturnType<boolean> & {
    value: T,
};

const mediaPointsValues = Object.values(MEDIA_POINTS).sort((a, b) => a - b);
const mediaResult = mediaPointsValues.reduce((prev, mediaPoint) => ({
    ...prev,
    [`is${mediaPoint}`]: false
}), {}) as UseMediaResultType;

const useMediaPoint = () => {
    const [mediaPoint, setMediaPoint] = useState(0);
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            let point = 0;
            for (let i = 0; i < mediaPointsValues.length; i++) {
                if (width >= mediaPointsValues[i]) {
                    point = mediaPointsValues[i];
                } else {
                    if (+point !== +mediaPoint) {
                        setMediaPoint(point);
                    }
                    return;
                }
            }
            if (+point !== +mediaPoint) {
                setMediaPoint(point);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return mediaPoint;
}

export function useMedia(): UseMediaResultType;
export function useMedia<T>(media?: Partial<UseMediaEntryType<T>>): UseMediaResultWithValueType<T>
export function useMedia<T>(media?: Partial<UseMediaEntryType<T>>): any {
    const mediaPointCurrent = useMediaPoint();

    return useMemo(() => {
        const result: UseMediaResultType = { ...mediaResult };
        for (let i = 0; i < mediaPointsValues.length; i++) {
            let mediaPoint = mediaPointsValues[i];
            let mediaPointNext = mediaPointsValues[i + 1] ?? 99999;
            result[`is${mediaPoint}`] = +(i === 0 ? 0 : mediaPoint) <= mediaPointCurrent && mediaPointCurrent < mediaPointNext;
        }

        if (!media || Object.values(media).length === 0) {
            return result;
        }

        let value: T = Object.values(media)[0];
        for (const [mediaPoint, mediaValue] of Object.entries(media)) {
            if (mediaPointCurrent >= +mediaPoint) {
                value = mediaValue;
            }
        }

        return {
            ...result,
            value
        };
    }, [mediaPointCurrent, media]);
}
