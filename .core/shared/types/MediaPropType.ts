import { MediaPointsType } from "./MediaPointsType";

export type MediaPropType<T, Props extends keyof T> = Record<number, Pick<T, Props>>;
