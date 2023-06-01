'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { COLORS } from "shared/contants";

import { UiIcon } from "../UiIcon";

import { Title } from './components/Title';
import { Description } from './components/Description';

import './index.scss';

type PropsType = {
    title?: string,
    isOpened?: boolean,
    children?: React.ReactNode,
    width?: number,
    onClose?: () => void
}

const Modal = observer((
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
                        <UiIcon size={16} name={'close'} color={COLORS.GREEN_SECONDARY}/>
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

export const UiModal = Object.assign(Modal, {
    Title: Title,
    Description: Description
})
