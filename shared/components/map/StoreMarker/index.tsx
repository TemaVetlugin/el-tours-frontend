import React, { ReactElement, useEffect, useState } from "react";
import { Observer, observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import { v4 } from 'uuid';

import './index.scss';

type PropsType = {
}

export const StoreMarker = observer((
    {  }: PropsType
) => {
    return null;
});
