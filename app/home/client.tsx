'use client';

import React from "react";
import {UiButton, UiIcon, UiPage, UiSelect, UiSlider} from "shared/ui";
import {observer} from "mobx-react-lite";

import {homeQuery} from "shared/queries/frontend";
import {ReturnType} from "shared/types";
import {useCity} from "shared/hooks";
import {COLORS, ROUTES} from "shared/contants";
import {LayoutHeader} from "shared/layout";
import {UserService} from "shared/services";
import {UiCardWrap} from "shared/ui/UiCardsWrap";
import {VmCard} from "shared/viewmodels/VmCard";
import classNames from "classnames";
import classnames from "classnames";
import {VmWorker} from "shared/viewmodels";


type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer((
    {}: PropsType
) => {
    const city = useCity();

    const media: {id:number, type: 'small' | 'large', src: string, weather: string, text: string }[] = [
        {id: 1, type: 'large', src: '/assets/images/typical/image69.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 2, type: 'small', src: '/assets/images/typical/image70.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 3, type: 'small', src: '/assets/images/typical/image71.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 4, type: 'small', src: '/assets/images/typical/image69.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 5, type: 'large', src: '/assets/images/typical/image70.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 6, type: 'small', src: '/assets/images/typical/image71.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 7, type: 'small', src: '/assets/images/typical/image69.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 8, type: 'small', src: '/assets/images/typical/image70.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 9, type: 'large', src: '/assets/images/typical/image71.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 10, type: 'large', src: '/assets/images/typical/image69.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 11, type: 'small', src: '/assets/images/typical/image70.png', weather: '+33 °C, море +25 °C', text: 'text'},
        {id: 12, type: 'small', src: '/assets/images/typical/image71.png', weather: '+33 °C, море +25 °C', text: 'text'},
        // и т.д.
    ];

    const duplicatedMedia=[...media, ...media]


    return (
        <UiPage className="p-home">
            <LayoutHeader template={"home"}/>
            <div className="p-home-main">

                <UiPage.Wrap>
                    <div className="p-home-main-search">
                        <div className="p-home-main-search-headers">
                            <div className="p-home-main-search-headers__button_active">
                                <h5>Туры</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Авиабилеты</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Отели</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Перелет+отель</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Круизы</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Аренда авто</h5>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <h5>Недвижимость</h5>
                            </div>
                        </div>
                        <div className="p-home-main-search-content">
                            <div className="p-home-main-search-content-city">
                                <h5>Город вылета</h5>
                                <div className="p-home-main-search-content__wrap">
                                    <p>Нижний Новгород</p>
                                    <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-country">
                                <h5>Страна, курорт или отель</h5>
                                <div className="p-home-main-search-content__wrap">
                                    <p>Греция</p>
                                    <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-date">
                                <h5>Дата вылета</h5>
                                <div className="p-home-main-search-content__wrap">
                                    <p>с 9 авг</p>
                                    <UiIcon size={16} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-nights">
                                <h5>Ночей</h5>
                                <div className="p-home-main-search-content__wrap">
                                    <p>на 7-8 ночей</p>
                                    <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-tourists">
                                <h5>Туристов</h5>
                                <div className="p-home-main-search-content__wrap">
                                    <p>2 взрослых</p>
                                    <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <UiButton
                                notification={UserService.user.userFavorites.length}

                            >
                                <UiIcon size={24} name={'search'}/>
                            </UiButton>

                        </div>
                    </div>

                </UiPage.Wrap>

                <div className="p-home-main-actions">
                    <UiSlider
                        className={'p-home-main-actions-slider'}
                        slideClassName={'p-home-main-actions-slide'}
                        perGroup={1}
                        perPage={'auto'}
                        loop={true}

                        gap={6}
                        items={duplicatedMedia}
                        slide={(item, index) => (
                            <UiSlider.Slide
                                render={() => (
                                    <div
                                        className={classnames('p-home-main-actions-slide__inner', {
                                            'p-home-main-actions-slide__inner--active': index === item.id
                                        })}
                                    >
                                        <div className={"p-home-main-actions-slide__item"}>
                                            <UiIcon size={40} name={'book'} color={'white'}/>
                                            <div>
                                                <span><span className={"p-home-main-actions-slide__item--small"}>
                                                    {item.text}</span>{item.text}
                                                </span>
                                                <span className={"p-home-main-actions-slide__item--green"}>
                                                    Кипр из Москвы за 10 351   /чел. </span>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            />
                        )}

                    />
                </div>

                <div className="p-home-main__blackout"></div>

            </div>
            <div className="p-home-tours">
                <h2 className="p-home-tours__header">
                    Авторские туры
                </h2>
                <UiCardWrap className={"p-home-tours__wrap"}>
                    {media.map((media) =>
                        <VmCard key={media.id}
                                template={media.type}
                                background={media.src}
                                header={<>
                                    <UiButton
                                        template={'normal'}
                                        className={'p-home-tours__button'}
                                        colors={{
                                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                            label: [COLORS.WHITE, COLORS.WHITE],
                                        }}
                                    >
                                        <span>{media.weather}</span>
                                    </UiButton>
                                    <UiButton
                                        template={'normal'}
                                        className={'p-home-tours__button p-home-tours__button--gray'}
                                        colors={{
                                            button: [COLORS.DARK_PRIMARY, COLORS.GREEN_SECONDARY],
                                            label: [COLORS.WHITE, COLORS.WHITE],
                                        }}
                                    >
                                        <span>{media.weather}</span>
                                    </UiButton>
                                </>}
                                body={
                                    <>
                                        <div>
                                            <h3 className="p-home-tours__place">{media.text}</h3>
                                            <span className="p-home-tours__country">{media.text}</span>
                                        </div>
                                        <div>
                                            <h3 className={classNames(`p-home-tours__price`, media.type==='large'&&'p-home-tours__price--end')}>{media.text}</h3>
                                            <div className="p-home-tours__details">
                                                {media.type==='small'&&<UiButton
                                                    template={'normal'}
                                                    className={'p-home-tours__button--small'}
                                                    colors={{
                                                        button: [COLORS.DARK_SECONDARY, COLORS.GREEN_SECONDARY],
                                                        label: [COLORS.WHITE, COLORS.WHITE],
                                                    }}
                                                >
                                                    <span>{media.text}</span>
                                                </UiButton>}
                                                <span>{media.text}{media.text}{media.text}{media.text}{media.text}</span>
                                                {media.type==='large'&&<UiButton
                                                    template={'normal'}
                                                    className={'p-home-tours__button--small'}
                                                    colors={{
                                                        button: [COLORS.DARK_SECONDARY, COLORS.GREEN_SECONDARY],
                                                        label: [COLORS.WHITE, COLORS.WHITE],
                                                    }}
                                                >
                                                    <span>{media.text}</span>
                                                </UiButton>}
                                            </div>
                                        </div>

                                    </>
                                }

                        />)}
                </UiCardWrap>
                <UiButton
                    template={'normal'}
                    className={'p-home-tours__confirm'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_SECONDARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                        label: [COLORS.DARK_PRIMARY, COLORS.WHITE],

                    }}
                >
                    <span>Показать больше вариантов</span>
                </UiButton>
            </div>
            <div className="p-home-offer">
                <h2 className="p-home-offer__title">Для Вас мы предлагаем:</h2>
                <UiPage.Wrap className="p-home-offer__wrap">
                    <div className="p-home-offer__item">
                        <UiIcon size={ 48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={ 48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={ 48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={ 48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={ 48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                </UiPage.Wrap>
            </div>
            <div className="p-home-feedback">
                <UiPage.Wrap className="p-home-feedback-header">
                    <div>
                        <h2 className="p-home-feedback-header__title">Отзывы счастливых туристов</h2>
                        <span className="p-home-feedback-header__description">Съездили с нами в отпуск? Поделитесь Вашими впечатлениями!</span>
                    </div>
                    <div className={"p-home-feedback-header--flex"}>
                        <UiSelect items={[{id: 1, name:<div className="p-home-feedback-header__filter">
                            <span >Последние</span>
                                <UiIcon size={[15, 10]} name={'arrowUp'}/>
                            </div>}]}/>
                        <UiButton
                            template={'normal'}
                            className={'p-home-tours__button--small'}
                            colors={{
                                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}
                        >
                            <span>Оставить отзыв</span>
                        </UiButton>
                    </div>
                </UiPage.Wrap>
            </div>
        </UiPage>
    );
});
