'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { UiDropdown, UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    template?: 'icon' | 'inline',
    style?: React.CSSProperties
}

const ITEMS = [
    { id: 'vk', name: 'Вконтакте', icon: 'vk', color: '#0077FF' },
    { id: 'fb', name: 'Facebook', icon: 'vk', color: '#3B5998' },
    { id: 'ok', name: 'Одноклассники', icon: 'vk', color: '#F97400' },
]
export const UiShare = observer(({ template = 'inline', style }: PropsType) => {
    const handleShare = (id: string) => {
        const url = window.location.origin + window.location.pathname;

        if (id === 'vk') {
            window.open(`https://vk.com/share.php?title=${document.title}&url=${url}`, '_blank')?.focus();
        }

        if (id === 'fb') {
            window.open(`https://www.facebook.com/sharer.php?t=${document.title}&u=${url}`, '_blank')?.focus();
        }

        if (id === 'ok') {
            window.open(`https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${url}`, '_blank')?.focus();
        }
    }

    return (
        <div className={'ui-share'} style={style}>
            <UiDropdown
                items={ITEMS}
                itemLabel={item => (
                    <div className="ui-share__item">
                        <UiIcon size={16} name={item.icon} color={item.color}/>
                        <span>{item.name}</span>
                    </div>
                )}

                onChange={(data) => handleShare(data.value as string)}
            >
                {template === 'inline' && (
                    <div className="ui-share-inline">
                        <span>Поделиться</span>
                        <UiIcon size={16} name={'share'}/>
                    </div>
                )}
                {template === 'icon' && (
                    <div className="ui-share-icon">
                        <UiIcon size={24} name={'share'}/>
                    </div>
                )}
            </UiDropdown>
        </div>
    )
})
