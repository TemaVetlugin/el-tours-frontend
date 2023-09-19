'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {ArticleModel, CatalogProductModel, PaginationModel} from "shared/models";
import {articlesQuery} from "shared/queries/main";
import {VmArticle} from "shared/viewmodels";
import {UiButton, UiDataBoundary, UiForm, UiGrid, UiIcon, UiInput, UiLightbox, UiLink, UiPage, UiSelect, UiSlider, UiTypography} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {COLORS, ROUTES} from "shared/contants";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";
import classnames from "classnames";
import playImage from "../product/[slug]/assets/play.svg";
import {UserService} from "shared/services";
import {PVisaManager} from "./components/PVisaManager";
import {PVisaCountries} from "./components/PVisaCountries";
import {PVisaServices} from "./components/PVisaServices";
import {UiCardWrap} from "shared/ui/UiCardsWrap";
import {VmCard} from "shared/viewmodels/VmCard";
import classNames from "classnames";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
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

    const countries: {name: string, flag?: string}[] = [{name: 'Россия', flag: '/assets/images/typical/flag.png',},
        {name: 'Абхазия', flag: '/assets/images/typical/flag.png',},
        {name: 'Австралия', flag: '/assets/images/typical/flag.png',},
        {name: 'Азербайджан', flag: '/assets/images/typical/flag.png',},
        {name: 'Белоруссия', flag: '/assets/images/typical/flag.png',},
        {name: 'Восточный Тимор', flag: '/assets/images/typical/flag.png',},
        {name: 'Гватемала', flag: '/assets/images/typical/flag.png',},
        {name: 'Зимбабве', flag: '/assets/images/typical/flag.png',},
        {name: 'Алжир', flag: '/assets/images/typical/flag.png',},
        {name: 'Италия', flag: '/assets/images/typical/flag.png',},
    {name: 'Албания', flag: '/assets/images/typical/flag.png',},]


    const firstLetters =  countries.map(str => str.name.charAt(0)).filter((letter, index, arr) => arr.indexOf(letter) === index).sort();





    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    // useAsyncEffect(async () => {
    //     store.set("isShallowLoading", true);
    //     const {isSuccess, data} = await articlesQuery({
    //         page: searchParams.page,
    //     });
    //     if (isSuccess && data) {
    //         store.pagination.update(data.pagination);
    //         store.set("articles", data.items.map(item => new ArticleModel(item)));
    //     }
    //     store.set("isLoading", false);
    //     store.set("isShallowLoading", false);
    // }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage className="p-country">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.VISA()]}
                title={'Страны мира'}
                subtitle={'В нашем путеводителе вы найдете подробную информацию о 217 странах мира'}
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
                        <UiLink className="p-country-filters-location__link p-country-filters-location__link--пкуут">Все</UiLink>
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
                        <VmCard key={media.id}
                                template={media.type}
                                className={'p-country-cards__item'}
                                background={media.src}
                                header={<>
                                    {media.weather &&
                                        <UiButton
                                            template={'normal'}
                                            className={'p-country-cards__button'}
                                            colors={{
                                                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                                label: [COLORS.WHITE, COLORS.WHITE],
                                            }}
                                        >
                                            <span>{media.weather}</span>
                                        </UiButton>
                                    }
                                    {media.visa &&
                                        <UiButton
                                            template={'normal'}
                                            className={'p-country-cards__button p-country-cards__button--gray'}
                                            colors={{
                                                button: [COLORS.DARK_PRIMARY, COLORS.GREEN_SECONDARY],
                                                label: [COLORS.WHITE, COLORS.WHITE],
                                            }}
                                        >
                                            <span>{media.visa}</span>
                                        </UiButton>
                                    }
                                    <div className={"p-country-cards__icon--flex"}>
                                        {media.views &&
                                            <div className="p-country-cards__icon">
                                                <UiIcon size={[24, 24]} name={"views"}/>
                                                <span>{media.views}</span>
                                            </div>
                                        }
                                        {media.comments &&
                                            <div className="p-country-cards__icon">
                                                <UiIcon size={20} name={"comments"}/>
                                                <span>{media.comments}</span>
                                            </div>
                                        }
                                    </div>
                                </>}
                                body={
                                    <>
                                        <div>
                                            {media.flag &&
                                                <div className="p-country-cards__flag" style={{backgroundImage: `url(${media.flag})`}}></div>
                                            }
                                            <h3 className="p-country-cards__place">{media.text}</h3>
                                            <span className="p-country-cards__description">{media.text}</span>
                                        </div>
                                        {media.id === 3 &&
                                            <div>
                                                <h3 className={`p-country-cards__price`}>{media.text} <UiIcon size={28} name={'fire'}></UiIcon></h3>
                                                <div className="p-country-cards__details">

                                                    <span>{media.text}{media.text}{media.text}{media.text}{media.text}</span>

                                                </div>
                                            </div>
                                        }

                                    </>
                                }

                        />)}
                </UiCardWrap>

                <div className="p-country-alphabet">
                    {firstLetters.map(firstLetters=>
                        <UiLink className={"p-country-alphabet__item"} key={firstLetters}>
                            {firstLetters}
                        </UiLink>
                    )}
                </div>

                <div className="p-country-list">
                    {firstLetters.map(firstLetters=>
                        <div className="p-country-list__row" key={firstLetters}>
                        <div className={"p-country-list__letter"}>
                            {firstLetters}
                        </div>
                            {countries.filter(country=>country.name.charAt(0)===firstLetters).map(country=>

                                    <div className={"p-country-list-item"} key={country.name}>
                                    <div className="p-country-list-item__flag"></div>
                                    <div className="p-country-list-item__name">{country.name}</div>

                            </div>
                            )}
                        </div>
                    )}
                </div>
            </UiPage.Wrap>


        </UiPage>
    )
});
