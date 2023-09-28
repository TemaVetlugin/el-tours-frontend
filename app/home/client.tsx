'use client';

import React from "react";
import { UiButton, UiForm, UiIcon, UiInput, UiLink, UiPage, UiSelect, UiSlider } from "shared/ui";
import classnames from "classnames";
import { observer } from "mobx-react-lite";

import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";
import { useCity } from "shared/hooks";
import { COLORS } from "shared/contants";
import { LayoutHeader } from "shared/layout";
import { UserService } from "shared/services";
import { UiCardWrap } from "shared/ui/UiCardsWrap";
import { VmTour } from "shared/viewmodels/VmTour";

type PropsType = NonNullable<ReturnType<typeof homeQuery>['data']>;
export const Client = observer((
    {}: PropsType
) => {
    const city = useCity();

    const media: { id: number, type: 'small' | 'large', src: string, weather: string, text: string }[] = [
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

    const duplicatedMedia = [...media, ...media]


    return (
        <UiPage className="p-home">
            <LayoutHeader template={"home"}/>
            <div className="p-home-main">

                <UiPage.Wrap>
                    <div className="p-home-main-search">
                        <div className="p-home-main-search-headers">
                            <div className="p-home-main-search-headers__button p-home-main-search-headers__button--active">
                                <span>Туры</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Авиабилеты</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Отели</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Перелет+отель</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Круизы</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Аренда авто</span>
                            </div>
                            <div className="p-home-main-search-headers__button">
                                <span>Недвижимость</span>
                            </div>
                        </div>
                        <div className="p-home-main-search-content">
                            <div className="p-home-main-search-content-item">
                                <span className="p-home-main-search-content-item__title">Город вылета</span>
                                <div className="p-home-main-search-content-item__wrap">
                                    <span>Нижний Новгород</span>
                                    <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-item">
                                <span className="p-home-main-search-content-item__title">Страна, курорт или отель</span>
                                <div className="p-home-main-search-content-item__wrap">
                                    <span>Греция</span>
                                    <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-item">
                                <span className="p-home-main-search-content-item__title">Дата вылета</span>
                                <div className="p-home-main-search-content-item__wrap">
                                    <span>с 9 авг</span>
                                    <UiIcon size={16} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-item">
                                <span className="p-home-main-search-content-item__title">Ночей</span>
                                <div className="p-home-main-search-content-item__wrap">
                                    <span>на 7-8 ночей</span>
                                    <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-home-main-search-content-item p-home-main-search-content-item--last">
                                <span className="p-home-main-search-content-item__title">Туристов</span>
                                <div className="p-home-main-search-content-item__wrap">
                                    <span>2 взрослых</span>
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
                        <VmTour
                            key={media.id}
                            tour={media}
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
                        <UiIcon size={48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={48} name={'book'} color={'white'}/>
                        <span className="p-home-offer__text">Страхование путешествия</span>
                    </div>
                    <div className="p-home-offer__item">
                        <UiIcon size={48} name={'book'} color={'white'}/>
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
                        <UiSelect items={[{
                            id: 1, name: <div className="p-home-feedback-header__filter">
                                <span>Последние</span>
                                <UiIcon size={[15, 10]} name={'arrowUp'}/>
                            </div>
                        }]}/>
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
                <div className="p-home-feedback-list">
                    <UiSlider
                        className={'p-home-feedback-list-slider'}
                        slideClassName={'p-home-feedback-list-slide'}
                        perGroup={1}
                        perPage={3}
                        loop={true}
                        gap={100}
                        items={duplicatedMedia}
                        slide={(item, index) => (
                            <UiSlider.Slide
                                render={() => (
                                    <div
                                        className={classnames('p-home-feedback-list-slide__inner', {
                                            'p-home-feedback-list-slide__inner--active': index === item.id
                                        })}
                                    >
                                        <>
                                            <div className="p-home-feedback-list-slide-header">
                                                <div className="p-home-feedback-list-slide-header__image"
                                                     style={{backgroundImage: `url(${item.src})`}}></div>
                                                <div className="p-home-feedback-list-slide-header__content">
                                                    <h3 className="p-home-feedback-list-slide-header__name">Мария</h3>
                                                    <span className="p-home-feedback-list-slide-header__text">Доминиканская республика, Пунта-Кана, Grand palladium punta cana resort & spa 5*</span>
                                                    <span className="p-home-feedback-list-slide-header__date">12 сентября, 2018</span>
                                                </div>
                                            </div>
                                            <div className="p-home-feedback-list-slide-content">
                                                <span className="p-home-feedback-list-slide-content__text">Хочу начать с благодарности нашему менеджеру Наташе. У нас получилась достаточно сложная ситуация: туроператор Тез-тур долго присылали варианты (причем имея копии документов), которые нам не подходили (варианты были в отелях, принимающих старше 18 лет, а у меня сыну 17), т.е. Тез-тур НЕ проверял подходят отели или нет. Наташа по всем вариантам перезапрашивала опять оператора: «Запросите отель – примут ли ребенка 17 лет» ...</span>
                                                <UiLink
                                                    className={"p-home-feedback-list-slide-content__link"}>Подробнее</UiLink>
                                            </div>
                                        </>

                                    </div>
                                )}

                            />
                        )}

                        navigation={(navigation) => {
                            if (navigation.pages() < 6) {
                                return null;
                            }
                            return (
                                <>
                                    <div className='p-home-feedback-list-slider__control'>
                                        <div className="p-home-feedback-list-slider__arrow" onClick={navigation.prev}>
                                            <UiIcon size={20} name={'chevronLeft'} color={COLORS.DARK_SECONDARY}/>
                                        </div>
                                    </div>
                                    <div
                                        className='p-home-feedback-list-slider__control p-home-feedback-list-slider__control--next'>
                                        <div className="p-home-feedback-list-slider__arrow" onClick={navigation.next}>
                                            <UiIcon size={20} name={'chevronRight'} color={COLORS.DARK_SECONDARY}/>
                                        </div>
                                    </div>
                                </>
                            );
                        }}

                    />
                </div>
            </div>

            <div className="p-home-subscribe">
                <UiPage.Wrap className="p-home-subscribe__wrap">
                    <div className="p-home-subscribe-header">
                        <h3 className="p-home-subscribe-header__title">Подписаться на путешествия:</h3>
                        <span
                            className="p-home-subscribe-header__text">Раз в неделю вы будете получать лучшие предложения, эксклюзивные цены, полезные советы и многое другое.</span>
                        <div className="p-home-subscribe__sticker"></div>
                    </div>
                    <UiForm className="p-home-subscribe-form">
                        <UiInput
                            className={"p-home-subscribe-form__input"}
                            placeholder='Ваш E-mail'
                            name={'query'}
                        />
                        <UiButton template={'search_right'} className={"p-home-subscribe-form__button"} type={'submit'} colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.WHITE, COLORS.WHITE],
                        }}>
                            <span>Подписаться</span>
                        </UiButton>
                    </UiForm>
                </UiPage.Wrap>
            </div>

            <UiPage.Wrap className="p-home-blog">
                <div className="p-home-blog-header">
                    <h2 className="p-home-blog-header__title">Впечатления туриста</h2>
                    <span
                        className="p-home-blog-header__text">Самые ценные советы: куда поехать отдыхать, где провести отпуск с детьми, что взять с собой в поездку и многое другое</span>
                </div>
                <UiCardWrap className={"p-home-blog__wrap"}>
                    {media.map((media) =>
                        <div key={media.id} className={`p-home-blog-card p-home-blog-card--${media.type}`}>
                            <div className="p-home-blog-card__image" style={{backgroundImage: `url(${media.src})`}}></div>
                            <div className="p-home-blog-card-content">
                                <div className="p-home-blog-card-content__time">
                                    <UiIcon size={16} name={'notebook'}/>
                                    Время прочтения 15 минут
                                </div>
                                <div className="p-home-blog-card-content__wrap">
                                    <h3 className="p-home-blog-card-content__title">{media.text}</h3>
                                    <span className="p-home-blog-card-content__text">Известно, что османы взяли Константинополь в 1453 году, после чего турецкое иго за десяток лет...</span>
                                </div>
                                <span className="p-home-blog-card-content__date">12 сентября, 2018</span>
                                <div className="p-home-blog-card-content-author">
                                    <div className="p-home-blog-card-content-author__image" style={{backgroundImage: `url(${media.src})`}}></div>
                                    <div className="p-home-blog-card-content-author__wrap">
                                        <span className="p-home-blog-card-content-author__name">Алеся Феоктистова</span>
                                        <span className="p-home-blog-card-content-author__nickname">Alesja_Popkova</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </UiCardWrap>
                <UiButton
                    template={'normal'}
                    className={'p-home-blog__confirm'}
                    colors={{
                        button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_SECONDARY],
                        border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_SECONDARY],
                        label: [COLORS.DARK_PRIMARY, COLORS.WHITE],

                    }}
                >
                    <span>Читать больше</span>
                </UiButton>
            </UiPage.Wrap>
        </UiPage>
    )
});
