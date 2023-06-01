import { MediaPointType } from "./MediaPointType";

export type MediaPropType<T, Props extends keyof T> = Record<MediaPointType, Pick<T, Props>>;
