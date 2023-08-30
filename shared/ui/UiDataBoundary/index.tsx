'use client';

'use client';

import classnames from "classnames";
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { useStore } from "shared/hooks";

import { UiButton } from '../UiButton';
import { UiLoading } from '../UiLoading';

import './index.scss';

type PropsType = {
    isError?: boolean;
    isLoading?: boolean;
    className?: string,
    withShallow?: boolean;
    withoutSSR?: boolean;
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
        withShallow,
        withoutSSR,
        className,
        actionText = 'Обновить',
        errorMessage = 'Что-то пошло не так. \nНе удалось загрузить данные.',
        style = {},
        onAction,
        render,
        children
    }: PropsType
) => {
    const store = useStore({
        isInitializing: true,
        isFirstLoaded: false
    });

    const styles = {
        ...style
    };

    useEffect(() => {
        setTimeout(() => {
            store.set('isInitializing', false);
        }, 250);
    }, [store]);

    useEffect(() => {
        if (!isLoading) {
            store.set('isInitializing', true);
        }
    }, [store, isLoading]);

    const isShallow = withShallow && store.isFirstLoaded;
    const isLoadingVisible = isLoading || (withoutSSR && store.isInitializing);

    if (!isShallow && (isLoadingVisible || isError)) {
        return (
            <div
                className={'ui-data-boundary ui-data-boundary--loading'}
                style={styles}
            >
                {isLoadingVisible && (
                    <div className='ui-data-boundary__loading'>
                        <img src="/assets/images/logo.svg" alt=""/>
                        <UiLoading size={40}/>
                    </div>
                )}
                {!isLoadingVisible && isError && (
                    <>
                        <div className='ui-data-boundary__error'>{errorMessage}</div>
                        {onAction && <UiButton template='small' label={actionText} onClick={onAction}/>}
                    </>
                )}
            </div>
        );
    }

    if (isShallow) {
        return (
            <div className={classnames('ui-data-boundary', className, {
                'ui-data-boundary--shallow': isLoading,
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
