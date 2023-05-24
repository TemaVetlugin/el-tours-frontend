import React from 'react';
import { observer } from 'mobx-react';

import { UiLoading } from '../UiLoading';
import { UiButton } from '../UiButton';

import './index.scss';

type PropsType = {
    isError?: boolean;
    isLoading?: boolean;
    errorMessage?: string;
    actionText?: string;
    onAction?: () => void;
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export const UiBoundary = observer((
    {
        isError = false,
        isLoading = false,
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

    if (!isError && !isLoading) {
        return <>{children}</>;
    }

    return (
        <div className='ui-boundary' style={styles}>
            {isLoading && (
                <div className='ui-boundary__loading'>
                    <UiLoading style={{ height: 20 }}/>
                </div>
            )}
            {!isLoading && isError && (
                <>
                    <div className='ui-boundary__error'>{errorMessage}</div>
                    {onAction && <UiButton size='small' isRounded label={actionText} onClick={onAction}/>}
                </>
            )}
        </div>
    );
});
