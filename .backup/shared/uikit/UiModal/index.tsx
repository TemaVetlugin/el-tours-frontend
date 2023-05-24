import React from "react";
import { observer } from "mobx-react";

import { COLORS } from "shared/contants";

import { UiIcon } from "../UiIcon";

export { UiModalTitle } from './components/UiModalTitle';
export { UiModalDescription } from './components/UiModalDescription';
export { UiModalActions } from './components/UiModalActions';

import './index.scss';

type PropsType = {
    title?: string,
    isOpened?: boolean,
    children?: React.ReactNode,
    width?: number,
    onClose?: () => void
}

export const UiModal = observer((
    {
        title,
        children,
        width = 400,
        isOpened = true,
        onClose,
    }: PropsType
) => {
    if (!isOpened) {
        return null;
    }
    return (
        <div className="ui-modal">
            <div className="ui-modal__overlay" onClick={onClose}/>
            <div className="ui-modal__body" style={{ width }}>
                {onClose && (
                    <div className='ui-modal__close' onClick={onClose}>
                        <UiIcon size={16} name={'close'} color={COLORS.PRIMARY}/>
                    </div>
                )}
                {title && (<div className="ui-modal__title">{title}</div>)}
                <div className="ui-modal__inner">
                    {children}
                </div>
            </div>
        </div>
    )
})
