import React from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { UiForm, UiIcon } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { CLinkButton } from "shared/components";
import { useObservable } from "shared/hooks";

import image from './assets/image.png';

import './index.scss';

type PropsType = {
    title?: string,
    description?: React.ReactNode | string,
    withSearch?: boolean,
    link?: string | null,
    linkLabel?: string,
}

export const UiEmpty = observer(function (
    {
        title = 'Ничего не найдено',
        description = "К сожалению, страница не найдена. \nВернитесь на главную или воспользуйтесь поиском.",
        withSearch = true,
        link = ROUTES.HOME(),
        linkLabel = 'На главную',
    }: PropsType
) {
    const router = useRouter();
    const store = useObservable({
        query: ''
    });

    const handleSubmit = () => {
        if (!store.query) {
            return;
        }

        router.push({
            pathname: ROUTES.SEARCH(),
            query: {
                query: store.query
            }
        })
    }

    return (
        <div className="ui-empty">
            <div className='ui-empty__inner'>
                <div className='ui-empty__image' style={{ backgroundImage: `url(${image.src})` }}/>
                <div className='ui-empty__title'>{title}</div>
                <div className='ui-empty__description'>
                    {description}
                </div>
                {withSearch && (
                    <UiForm className="ui-empty-search" onSubmit={handleSubmit}>
                        <div className="ui-empty-search__icon">
                            <UiIcon size={20} name={'search'}/>
                        </div>
                        <input
                            required
                            name='query'
                            type="text"
                            className="ui-empty-search__control"
                            value={store.query}
                            onChange={(e) => {
                                store.set("query", e.target.value || '');
                            }}
                            placeholder="Поиск по каталогу"
                        />
                    </UiForm>
                )}
                {link && (
                    <div className="ui-empty__link">
                        <CLinkButton href={link} label={linkLabel}/>
                    </div>
                )}
            </div>
        </div>
    )
});
