'use client';

import React, { ReactElement } from "react";
import { observer } from "mobx-react-lite";

import { ContentResourceModel } from "shared/models";
import { useContentResource } from "shared/hooks";

type PropsType = {
    code: string,
    render: (contentResource: ContentResourceModel) => ReactElement,
}

export const UiContentResource = observer(({ code, render }: PropsType) => {
    const contentResource = useContentResource(code);
    if (!contentResource) {
        return null;
    }
    return render(contentResource);
});
