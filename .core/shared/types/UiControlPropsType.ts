import { ChangeHandlerType } from './ChangeHandlerType';
import React from "react";

export type UiControlPropsType<ValueType, AdditionalProps = {}> = {
    name?: string,
    value?: ValueType | null,
    style?: React.CSSProperties,
    className?: string,
    onChange?: ChangeHandlerType<ValueType | null>
} & AdditionalProps;
