import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    children: React.ReactNode
}

export const UiModalActions = observer(({ children }: PropsType) => {
    return (
        <div className="ui-modal-actions">
            {children}
        </div>
    )
})
