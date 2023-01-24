import React from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { UiButton, UiForm, UiIcon } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";
import { CLinkButton } from "shared/components";
import { useObservable } from "shared/hooks";

import image from './assets/image.png';
import image2 from './assets/image2.png';

import './index.scss';
import classNames from "classnames";

type PropsType = {
    title?: string,
    description?: React.ReactNode | string,
    link?: string | null,
    linkLabel?: string,
    isSearch?: boolean
}

export const UiEmpty2 = observer(function (
    {
        title = 'Страница не найдена',
        description = "Используйте Каталог или оформите заявку на товар, которого нет в Вашем городе",
        link = ROUTES.HOME(),
        linkLabel = 'Предзаказ',
        isSearch = false
    }: PropsType
) {
    const img = isSearch ? image2 : image;

    return (
        <div className={classNames('ui-empty-2', {'ui-empty-2--search': isSearch})}>
            <div className='ui-empty-2__image' style={{ backgroundImage: `url(${img.src})` }}/>
            <div className='ui-empty-2__inner'>
                <div className='ui-empty-2__title'>{title}</div>
                <div className='ui-empty-2__description'>
                    {description}
                </div>
                {link && (
                    <UiButton
                        href={link}
                        colors={{
                            button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                            label: [COLORS.WHITE, COLORS.WHITE]
                        }}
                    >
                        <span>{linkLabel}</span>
                        <UiIcon size={24} name={'chevronRight'} color={COLORS.WHITE}/>
                    </UiButton>
                )}
            </div>
        </div>
    )
});
