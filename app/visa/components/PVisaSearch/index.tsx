'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {COLORS, ROUTES} from "shared/contants";
import { useCity, useDebouncedCallback, useStore, useRouter, useSearchParams } from "shared/hooks";
import { searchHintsQuery } from "shared/queries/main";
import { AppService } from "shared/services";
import { ReturnType, UrlType } from "shared/types";

import { UiButton, UiDataBoundary, UiForm, UiIcon, UiInput, UiLink } from "shared/ui";

import './index.scss';

type SearchHints = NonNullable<ReturnType<typeof searchHintsQuery>['data']>;

export const PVisaSearch = observer(() => {
    const searchParams = useSearchParams({
        query: '',
    });

    const city = useCity();
    const router = useRouter();

    const store = useStore({
        query: searchParams.query,
        hints: false,
        isLoading: false,
    });

    const hints = useStore<SearchHints>({
        brands: [],
        compilations: [],
        catalogProducts: [],
        news: [],
        articles: [],
        total: 0
    });

    useEffect(() => {
        store.set("query", searchParams.query);
    }, [store, searchParams.query]);

    const handleChange = async (_query: string | null) => {
        const query = _query || '';
        store.update({
            isLoading: query.length >= 3,
            query
        });
        if (query.length < 3) {
            return;
        }
        fetchHints();
    }

    const fetchHints = useDebouncedCallback(async () => {
        if (store.query.length < 3) {
            return;
        }
        const { isSuccess, data } = await searchHintsQuery({
            query: store.query,
            cityId: city.id
        });

        if (isSuccess && data) {
            hints.update(data);
        }
        store.set("isLoading", false);
    }, 700);

    const handleSubmit = () => {
        if (!store.query) {
            return;
        }
        // router.push(ROUTES.SEARCH(), {
        //     query: store.query,
        // });
        store.set("hints", false);
    }

    return (
        <div className="p-visa-search">
            <UiForm onSubmit={handleSubmit} className="p-visa-search__control">
                <UiButton template={'search_left'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                }}>
                    <UiIcon size={24} name={'search'}/>
                </UiButton>
                <UiInput
                    placeholder='Виза в страну'
                    name={'query'}
                    onChange={(data) => handleChange(data.value)}
                    value={store.query}
                    onFocus={() => store.set("hints", true)}
                    onBlur={() => store.set("hints", false)}
                />


                {store.hints && (
                    <div className="p-visa-search-hints">
                        {store.query.length < 3 && (
                            <div className={'p-visa-search-hints__label'}>Введите более 2 символов для отображения подсказок</div>
                        )}
                        {store.query.length >= 3 && (
                            <UiDataBoundary isLoading={store.isLoading}>
                                {hints.total === 0 && (
                                    <div className={'p-visa-search-hints__label'}>По вашему запросу ничего не найдено</div>
                                )}
                                {hints.total > 0 && (
                                    <div className="p-visa-search-hints__sections">
                                        <LayoutHeaderSearchHintsSection
                                            title={"Интересно"}
                                            items={hints.articles}
                                            href={(article) => ROUTES.ARTICLES(article.slug)}
                                        />
                                    </div>
                                )}
                            </UiDataBoundary>
                        )}
                    </div>
                )}
            </UiForm>
            <div className="p-visa-search__prompts">
                {AppService.searchPrompts.map(searchPrompt => (
                    <UiLink
                        key={searchPrompt.id}
                        className={'p-visa-search__prompt'}
                    >
                        {searchPrompt.name}
                    </UiLink>
                ))}
            </div>
        </div>
    );
});

type LayoutHeaderSearchHintsSectionPropsType = {
    items: SearchHints['catalogProducts'],
    href: (item: SearchHints['catalogProducts'][number]) => UrlType,
    title: string
}
const LayoutHeaderSearchHintsSection = observer((
    {
        items,
        href,
        title
    }: LayoutHeaderSearchHintsSectionPropsType
) => {
    if (items.length === 0) {
        return null;
    }
    return (
        <div className="p-visa-search-hints-section">
            <div className="p-visa-search-hints-section__name">{title}</div>
            <div className="p-visa-search-hints-section__items">
                {items.map(item => (
                    <UiLink key={item.id} href={href(item)} className="p-visa-search-hint">
                        {item.name}
                    </UiLink>
                ))}
            </div>
        </div>
    );
})
