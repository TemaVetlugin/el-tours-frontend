import React from "react";

import { OnChangeType } from "shared/types";

export type UiControlPropsType<ValueType, AdditionalProps = {}> = {
    name?: string,
    value?: ValueType | null,
    style?: React.CSSProperties,
    className?: string,
    onChange?: OnChangeType<ValueType | null>
} & AdditionalProps;
