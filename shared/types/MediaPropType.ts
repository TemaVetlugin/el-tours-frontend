import { MediaPointType } from "./MediaPointType";

export type MediaPropType<T, Props extends keyof T> = Partial<Record<MediaPointType, Pick<T, Props>>>;
