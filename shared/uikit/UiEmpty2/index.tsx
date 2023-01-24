import React from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { UiButton, UiForm, UiIcon } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";
import { CLinkButton } from "shared/components";
import { useObservable } from "shared/hooks";

import image from './assets/image.png';

import './index.scss';

type PropsType = {
    title?: string,
    description?: React.ReactNode | string,
    link?: string | null,
    linkLabel?: string,
}

export const UiEmpty2 = observer(function (
    {
        title = 'Страница не найдена',
        description = "Воспользуйтесь Каталогом или оформите предзаказ на товар, которого еще нет в Вашем населенном пункте",
        link = ROUTES.HOME(),
        linkLabel = 'На главную',
    }: PropsType
) {
    const router = useRouter();
    const store = useObservable({
        query: ''
    });

    return (
        <div className="ui-empty-2">
            <div className='ui-empty-2__inner'>
                <div className='ui-empty-2__image' style={{ backgroundImage: `url(${image.src})` }}/>
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
                        <span>Предзаказ</span>
                        <UiIcon size={24} name={'chevronRight'} color={COLORS.WHITE}/>
                    </UiButton>
                )}
            </div>
        </div>
    )
});
