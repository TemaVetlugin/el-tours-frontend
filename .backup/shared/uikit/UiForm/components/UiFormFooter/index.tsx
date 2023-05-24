import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    children?: React.ReactNode
}

export const UiFormFooter = observer(({ children }: PropsType) => {
    return (
        <div className='ui-form-footer'>
            {children}
        </div>
    )
})

