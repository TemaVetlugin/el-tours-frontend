'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {COLORS, ROUTES} from "shared/contants";
import { useCity, useDebouncedCallback, useStore, useRouter, useSearchParams } from "shared/hooks";
import { searchHintsQuery } from "shared/queries/main";
import { LayoutService } from "shared/services";
import { ReturnType, UrlType } from "shared/types";

import { UiButton, UiDataBoundary, UiForm, UiIcon, UiInput, UiLink } from "shared/ui";

import './index.scss';

type SearchHints = NonNullable<ReturnType<typeof searchHintsQuery>['data']>;

export const LayoutHeaderSearch = observer(() => {
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
        router.push(ROUTES.SEARCH(), {
            query: store.query,
        });
        store.set("hints", false);
    }

    return (
        <div className="layout-header-search">
            <UiForm onSubmit={handleSubmit} className="layout-header-search__control">
                <UiButton template={'search_left'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                }}>
                    <UiIcon size={24} name={'search'}/>
                </UiButton>
                <UiButton template={'search_right'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    icon: [COLORS.DARK_SECONDARY, COLORS.DARK_SECONDARY],
                }}>
                    <UiIcon size={12} name={'arrow_down'}/>
                </UiButton>
                <UiInput
                    placeholder='Страна, город или отель'
                    name={'query'}
                    onChange={(data) => handleChange(data.value)}
                    value={store.query}
                    onFocus={() => store.set("hints", true)}
                    onBlur={() => store.set("hints", false)}
                />


                {store.hints && (
                    <div className="layout-header-search-hints">
                        {store.query.length < 3 && (
                            <div className={'layout-header-search-hints__label'}>Введите более 2 символов для отображения подсказок</div>
                        )}
                        {store.query.length >= 3 && (
                            <UiDataBoundary isLoading={store.isLoading}>
                                {hints.total === 0 && (
                                    <div className={'layout-header-search-hints__label'}>По вашему запросу ничего не найдено</div>
                                )}
                                {hints.total > 0 && (
                                    <div className="layout-header-search-hints__sections">
                                        <LayoutHeaderSearchHintsSection
                                            title={"Товары"}
                                            items={hints.catalogProducts}
                                            href={(catalogProduct) => ROUTES.PRODUCT(catalogProduct)}
                                        />
                                        <LayoutHeaderSearchHintsSection
                                            title={"Бренды"}
                                            items={hints.brands}
                                            href={(brand) => ROUTES.CATALOG_BRAND(brand.id)}
                                        />
                                        <LayoutHeaderSearchHintsSection
                                            title={"Подборки"}
                                            items={hints.compilations}
                                            href={(compilation) => ROUTES.COMPILATIONS(compilation.slug)}
                                        />
                                        <LayoutHeaderSearchHintsSection
                                            title={"Новости"}
                                            items={hints.news}
                                            href={(news) => ROUTES.NEWS(news.slug)}
                                        />
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
            <div className="layout-header-search__prompts">
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
        <div className="layout-header-search-hints-section">
            <div className="layout-header-search-hints-section__name">{title}</div>
            <div className="layout-header-search-hints-section__items">
                {items.map(item => (
                    <UiLink key={item.id} href={href(item)} className="layout-header-search-hint">
                        {item.name}
                    </UiLink>
                ))}
            </div>
        </div>
    );
})
