'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';

import { UiLoading } from '../UiLoading';
import { UiButton } from '../UiButton';

import './index.scss';
import classnames from "classnames";

type PropsType = {
    isError?: boolean;
    isLoading?: boolean;
    className?: string,
    isShallowLoading?: boolean;
    errorMessage?: string;
    actionText?: string;
    onAction?: () => void;
    style?: React.CSSProperties,
    children?: React.ReactNode,
}

export const UiDataBoundary = observer((
    {
        isError = false,
        isLoading = false,
        isShallowLoading = false,
        className,
        actionText = 'Обновить',
        errorMessage = 'Что-то пошло не так. \nНе удалось загрузить данные.',
        style = {},
        onAction,
        children
    }: PropsType
) => {
    const styles = {
        height: 80,
        ...style
    };

    if (isLoading) {
        return (
            <div
                className={'ui-data-boundary ui-data-boundary--loading'}
                style={styles}
            >
                {isLoading && (
                    <div className='ui-data-boundary__loading'>
                        <img src="/assets/images/logo.svg" alt=""/>
                        <UiLoading size={40}/>
                    </div>
                )}
                {!isLoading && isError && (
                    <>
                        <div className='ui-data-boundary__error'>{errorMessage}</div>
                        {onAction && <UiButton size='small' label={actionText} onClick={onAction}/>}
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={classnames('ui-data-boundary', className)}>
            {children}
            {isShallowLoading && (
                <div className='ui-data-boundary__loading ui-data-boundary__loading--shallow'>
                    <img src="/assets/images/logo.svg" alt=""/>
                    <UiLoading size={40}/>
                </div>
            )}
        </div>
    );
});
