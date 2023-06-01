import React from "react";

import { UiControlChangeHandler } from './UiControlChangeHandler';

export type UiControlPropsType<ValueType, AdditionalProps = {}> = {
    name?: string,
    value?: ValueType | null,
    style?: React.CSSProperties,
    className?: string,
    onChange?: UiControlChangeHandler<ValueType | null>
} & AdditionalProps;
