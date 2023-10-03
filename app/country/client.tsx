'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useSearchParams, useStore } from "shared/hooks";
import { ArticleModel, PageModel, PaginationModel } from "shared/models";
import { UiButton, UiForm, UiIcon, UiInput, UiLink, UiPage, UiSelect } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { COLORS, ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import { UiCardWrap } from "shared/ui/UiCardsWrap";
import { VmCountry } from "shared/viewmodels/VmCountry";
import { pageQuery } from "shared/queries/main";

export const Client = observer(() => {
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        page: new PageModel(),
        isLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
        activeSlide: 0,
        isShallowLoading: true,

    });

    const media: { id: number, type: 'small' | 'large', src?: string, flag?: string, weather?: string, views?: number, comments?: number, visa?: string, text?: string }[] = [
        {
            id: 1,
            type: 'large',
            src: '/assets/images/typical/image69.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 2, type: 'small', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', views: 12, comments: 21, text: 'text'},
        {
            id: 3,
            type: 'small',
            src: '/assets/images/typical/image150.png',
            visa: 'Шенгенская виза',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 4, type: 'small', src: '/assets/images/typical/image69.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 5, type: 'large', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 6, type: 'small', src: '/assets/images/typical/image150.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {
            id: 7,
            type: 'small',
            src: '/assets/images/typical/image69.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 8, type: 'small', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {
            id: 9,
            type: 'large',
            src: '/assets/images/typical/image150.png',
            visa: 'On-line виза',
            flag: '/assets/images/typical/flag.png',
            weather: '+33 °C, море +25 °C',
            text: 'text'
        },
        {id: 10, type: 'large', src: '/assets/images/typical/image69.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 11, type: 'small', src: '/assets/images/typical/image130.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 12, type: 'small', src: '/assets/images/typical/image150.png', flag: '/assets/images/typical/flag.png', weather: '+33 °C, море +25 °C', text: 'text'},
        // и т.д.
    ];

    const countries: { name: string, flag?: string }[] = [{name: 'Россия', flag: '/assets/images/typical/flag.png',},
        {name: 'Абхазия', flag: '/assets/images/typical/flag.png',},
        {name: 'Австралия', flag: '/assets/images/typical/flag.png',},
        {name: 'Азербайджан', flag: '/assets/images/typical/flag.png',},
        {name: 'Белоруссия', flag: '/assets/images/typical/flag.png',},
        {name: 'Восточный Тимор', flag: '/assets/images/typical/flag.png',},
        {name: 'Гватемала', flag: '/assets/images/typical/flag.png',},
        {name: 'Зимбабве', flag: '/assets/images/typical/flag.png',},
        {name: 'Алжир', flag: '/assets/images/typical/flag.png',},
        {name: 'Италия', flag: '/assets/images/typical/flag.png',},
        {name: 'Анцузская Полинезия', flag: '/assets/images/typical/flag.png',},
        {name: 'Анцузская Полинезия', flag: '/assets/images/typical/flag.png',},
        {name: 'Анцузская Полинезия', flag: '/assets/images/typical/flag.png',},
        {name: 'Анцузская Полинезия', flag: '/assets/images/typical/flag.png',},
        {name: 'Албания', flag: '/assets/images/typical/flag.png',},]


    const firstLetters = countries.map(str => str.name.charAt(0)).filter((letter, index, arr) => arr.indexOf(letter) === index).sort();


    const searchParams = useSearchParams({page: 1})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await pageQuery({
            url: ROUTES.COUNTRY().url,
        });
        if (isSuccess && data) {
            store.set("page", new PageModel(data.item));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page]);


    return (
        <UiPage className="p-country">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.VISA()}
                title={store.page.title}
                subtitle={store.page.subtitle}
                aside={
                    <UiForm className={"p-country-header__form"}>
                        <UiInput placeholder={"Введите направление"}/>
                        <UiButton template={'search_left'} type={'submit'} colors={{
                            button: [COLORS.TRANSPARENT, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.WHITE, COLORS.WHITE],
                        }}>
                            <UiIcon size={24} name={'search'}/>
                        </UiButton>
                    </UiForm>
                }
            />
            <UiPage.Wrap>
                <div className="p-country-filters">
                    <div className="p-country-filters-location">
                        <span className="p-country-filters-location__label">Части света:</span>
                        <UiLink className="p-country-filters-location__link p-country-filters-location__link--green">Все</UiLink>
                        <UiLink className="p-country-filters-location__link">Европа</UiLink>
                        <UiLink className="p-country-filters-location__link">Азия</UiLink>
                        <UiLink className="p-country-filters-location__link">Америка</UiLink>
                        <UiLink className="p-country-filters-location__link">Океания</UiLink>
                        <UiLink className="p-country-filters-location__link">Африка</UiLink>
                    </div>
                    <div className="p-country-filters-visa">
                        <span className="p-country-filters-visa__label">Визовый режим:</span>
                        <UiSelect placeholder={"Не важно"} className={"p-country-filters-visa__select"} items={[{id: 1, name: "Шенгенская"}]}/>
                    </div>
                </div>
                <UiCardWrap className={"p-country-cards"}>
                    {media.map((media) =>
                        <VmCountry
                            key={media.id}
                            country={media}

                        />)}
                </UiCardWrap>

                <div className="p-country-alphabet">
                    {firstLetters.map(firstLetters =>
                        <UiLink className={"p-country-alphabet__item"} key={firstLetters}>
                            {firstLetters}
                        </UiLink>
                    )}
                </div>

                <div className="p-country-list">
                    {firstLetters.map(firstLetters =>
                        <div className="p-country-list__wrap" key={firstLetters}>
                            <div className={"p-country-list__letter"}>
                                {firstLetters}
                            </div>
                            <div className="p-country-list__row">
                                {countries.filter(country => country.name.charAt(0) === firstLetters).map(country =>

                                    <div className={"p-country-list-item"} key={country.name}>
                                        <div className="p-country-list-item__flag" style={{backgroundImage: `url(${country.flag})`}}></div>
                                        <div className="p-country-list-item__name">{country.name}</div>

                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </UiPage.Wrap>


        </UiPage>
    )
});
