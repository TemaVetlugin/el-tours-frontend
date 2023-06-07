import React from "react";

import { ChangeHandlerType } from "shared/types";

export type UiControlPropsType<ValueType, AdditionalProps = {}> = {
    name?: string,
    value?: ValueType | null,
    style?: React.CSSProperties,
    className?: string,
    onChange?: ChangeHandlerType<ValueType | null>
} & AdditionalProps;
