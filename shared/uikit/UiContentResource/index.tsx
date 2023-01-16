import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { ContentResourceModel } from "shared/models";
import { ApplicationModule } from "shared/modules";

import './index.scss';

type PropsType = {
    name: string,
    className?: string,
    render: (contentResource: ContentResourceModel) => React.ReactNode
}

export const UiContentResource = observer(({ name, className, render }: PropsType) => {
    const contentResource = ApplicationModule.contentResources.find(contentResource => contentResource.name === name);

    if (!contentResource || !contentResource.isActive) {
        return null;
    }

    // const editUrl = getBackendUrl(`/admin/content-resource/${contentResource.id}/edit`);
    const classNames = classnames('ui-content-resource', className, {
        // 'ui-content-resource--editable': true,
    });

    return (
        <>
            {render(contentResource)}
        </>
    );
})
