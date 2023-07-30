'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiIcon, UiInput, UiLink } from "shared/ui";
import { LayoutService } from "shared/services";
import { useObservable, useRouter, useSearchParams } from "shared/hooks";
import { ROUTES } from "shared/contants";

import './index.scss';

export const LayoutHeaderSearch = observer(() => {
    const searchParams = useSearchParams({
        query: '',
    });

    const router = useRouter();

    const store = useObservable({
        query: searchParams.query
    });

    useEffect(() => {
        store.set("query", searchParams.query);
    }, [store, searchParams.query]);

    const handleSubmit = () => {
        if (!store.query) {
            return;
        }
        router.push(ROUTES.SEARCH(), {
            query: store.query
        });
    }

    return (
        <div className="layout-header-search">
            <UiForm onSubmit={handleSubmit} className="layout-header-search__control">
                <UiInput
                    placeholder='Поиск по наименованию, МНН, штрих-коду'
                    name={'query'}
                    onChange={store.handleChange}
                    value={store.query}
                />
                <UiButton size={'icon'} type={'submit'}>
                    <UiIcon size={24} name={'search'}/>
                </UiButton>
            </UiForm>
            <div className="layout-header-search__prompts">
                <span>Например: </span>
                {LayoutService.searchPrompts.map(searchPrompt => (
                    <UiLink
                        key={searchPrompt.id}
                        href={ROUTES.SEARCH().url + '?query=' + searchPrompt.name}
                        className={'layout-header-search__prompt'}
                    >
                        {searchPrompt.name}
                    </UiLink>
                ))}
            </div>
        </div>
    );
});
