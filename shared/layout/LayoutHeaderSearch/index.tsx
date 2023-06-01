'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { UiButton, UiForm, UiIcon, UiInput } from "shared/ui";
import { LayoutService } from "shared/services";
import { useNavigate, useObservable, useSearchParams } from "shared/hooks";
import { ROUTES } from "shared/contants";

import './index.scss';

export const LayoutHeaderSearch = observer(() => {
    const searchParams = useSearchParams({
        q: '',
    });

    const navigate = useNavigate();

    const store = useObservable({
        query: searchParams.q
    });

    useEffect(() => {
        store.set("query", searchParams.q);
    }, [store, searchParams.q]);

    const handleSubmit = () => {
        if (!store.query) {
            return;
        }
        navigate(ROUTES.SEARCH(), {
            q: store.query
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
                    <Link
                        key={searchPrompt.id}
                        href={ROUTES.SEARCH() + '?q=' + searchPrompt.name}
                        className={'layout-header-search__prompt'}
                    >
                        {searchPrompt.name}
                    </Link>
                ))}
            </div>
        </div>
    );
});
