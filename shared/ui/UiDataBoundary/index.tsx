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
    withShallowLoading?: boolean;
    isShallowLoading?: boolean;
    errorMessage?: string;
    actionText?: string;
    onAction?: () => void;
    render?: () => React.ReactNode,
    style?: React.CSSProperties,
    children?: React.ReactNode,
}

export const UiDataBoundary = observer((
    {
        isError = false,
        isLoading = false,
        withShallowLoading = false,
        isShallowLoading = false,
        className,
        actionText = 'Обновить',
        errorMessage = 'Что-то пошло не так. \nНе удалось загрузить данные.',
        style = {},
        onAction,
        render,
        children
    }: PropsType
) => {
    const styles = {
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
                        {onAction && <UiButton template='small' label={actionText} onClick={onAction}/>}
                    </>
                )}
            </div>
        );
    }

    if (withShallowLoading) {
        return (
            <div className={classnames('ui-data-boundary', className, {
                'ui-data-boundary--shallow': isShallowLoading,
            })}>
                {!!render && render()}
                {children}
                <div className='ui-data-boundary__loading ui-data-boundary__loading--shallow'>
                    <img src="/assets/images/logo.svg" alt=""/>
                    <UiLoading size={40}/>
                </div>
            </div>
        );
    }

    return (
        <>
            {!!render && render()}
            {children}
        </>
    )
});
