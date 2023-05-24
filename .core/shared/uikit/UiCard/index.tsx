import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

export { UiCardSection } from './components/UiCardSection';
export { UiCardPanel } from './components/UiCardPanel';

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string,
    isLight?: boolean
}

export const UiCard = observer(({ children, className, isLight = false }: PropsType) => {
    return (
        <div className={classnames('ui-card', className, {
            'ui-card--light': isLight
        })}>
            {children}
        </div>
    )
});
