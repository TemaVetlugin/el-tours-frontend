'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiIcon, UiInput } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { useRouter, useStore } from "shared/hooks";
import { hotelsQuery } from "shared/queries/main";
import { HotelService } from "shared/services";
import { router } from "next/client";
import { Notifier } from "shared/utilities";
import { HotelModel } from "shared/models";

import './index.scss';


export const PHomeSearch = observer(() => {
    const router = useRouter()
    const store = useStore({
        isLoading: false,
        departureCity: '',
        hintsCity: false,
        place: '',
        hintsPlace: false,
        date: '',
        hintsDate: false,
        nights: '',
        hintsNights: false,
        adults: '',
        hintsAdults: false,
    });


    const handleConfirm = async () => {
        store.set("isLoading", true);
        const {isSuccess, data, description} = await hotelsQuery({
            departureCity: store.departureCity,
            place: store.place,
            placeType: 'Region',
            date: store.date,
            nights: store.nights,
            adults: store.adults,
            children: '0',
            currency: 'RUB',
        });


        if (isSuccess && data) {
            if (data.items.length === 0) {
                Notifier.alert('К сожалению ни одного из товаров в данном заказе нет в наличии');
                return;
            }
            HotelService.set("hotels", data.items.map(cartItem => new HotelModel(cartItem)));
            router.push(ROUTES.TOUR());
        } else {
            Notifier.alert(description);
        }


        store.set("isLoading", false);
    }


    return (
        <UiForm className="p-home-search" onSubmit={handleConfirm}>
            <div className="p-home-search-headers">
                <div className="p-home-search-headers__button p-home-search-headers__button--active">
                    <span>Туры</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Авиабилеты</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Отели</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Перелет+отель</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Круизы</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Аренда авто</span>
                </div>
                <div className="p-home-search-headers__button">
                    <span>Недвижимость</span>
                </div>
            </div>
            <div className="p-home-search-content">
                <div className="p-home-search-content-item p-home-search-content-item--large">
                    {store.hintsCity &&
                        <span className="p-home-search-content-item__title">Город вылета</span>
                    }
                    <UiInput
                        className={"p-home-search-content__input"}
                        onChange={store.handleChange}
                        placeholder={'Город вылета'}
                        name={'departureCity'}
                        value={store.departureCity}
                        onFocus={() => store.set("hintsCity", true)}
                        onBlur={() => !store.departureCity && store.set("hintsCity", false)}
                    />
                    {store.hintsCity &&
                        <UiButton
                            template={'search_right'}
                            className={'p-home-search-content__button'}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                            }}>
                            <UiIcon size={16} name={"close"}/>
                        </UiButton>
                    }
                </div>
                <div className="p-home-search-content-item p-home-search-content-item--large">
                    {store.hintsPlace &&
                        <span className="p-home-search-content-item__title">Страна, курорт или отель</span>
                    }
                    <UiInput
                        className={"p-home-search-content__input"}
                        onChange={store.handleChange}
                        placeholder={'Страна, курорт или отель'}
                        name={'place'}
                        value={store.place}
                        onFocus={() => store.set("hintsPlace", true)}
                        onBlur={() => !store.place && store.set("hintsPlace", false)}
                    />
                    {store.hintsPlace &&
                        <UiButton
                            template={'search_right'}
                            className={'p-home-search-content__button'}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                            }}>
                            <UiIcon size={16} name={"close"} color={COLORS.GRAY_PRIMARY}/>
                        </UiButton>
                    }


                </div>
                <div className="p-home-search-content-item">
                    {store.hintsDate &&
                        <span className="p-home-search-content-item__title">Дата вылета</span>
                    }
                    <UiInput
                        className={"p-home-search-content__input"}
                        onChange={store.handleChange}
                        placeholder={'Дата вылета'}
                        name={'date'}
                        value={store.date}
                        onFocus={() => store.set("hintsDate", true)}
                        onBlur={() => !store.date && store.set("hintsDate", false)}
                    />
                    {store.hintsDate &&
                        <UiButton
                            template={'search_right'}
                            className={'p-home-search-content__button'}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                            }}>
                            <UiIcon size={16} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                        </UiButton>
                    }
                </div>
                <div className=" p-home-search-content-item p-home-search-content-item--small">
                    {store.hintsNights &&
                        <span className="p-home-search-content-item__title">Ночей</span>
                    }
                    <UiInput
                        className={"p-home-search-content__input"}
                        onChange={store.handleChange}
                        placeholder={'Ночей'}
                        name={'nights'}
                        value={store.nights}
                        onFocus={() => store.set("hintsNights", true)}
                        onBlur={() => !store.nights && store.set("hintsNights", false)}
                    />
                    {store.hintsNights &&
                        <UiButton
                            template={'search_right'}
                            className={'p-home-search-content__button'}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                            }}>
                            <UiIcon size={16} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                        </UiButton>
                    }
                </div>
                <div className="p-home-search-content-item p-home-search-content-item--last">
                    {store.hintsAdults &&
                        <span className="p-home-search-content-item__title">Туристов</span>
                    }
                    <UiInput
                        className={"p-home-search-content__input"}
                        onChange={store.handleChange}
                        placeholder={'Туристов'}
                        name={'adults'}
                        value={store.adults}
                        onFocus={() => store.set("hintsAdults", true)}
                        onBlur={() => !store.adults && store.set("hintsAdults", false)}
                    />
                    {store.hintsAdults &&
                        <UiButton
                            template={'search_right'}
                            className={'p-home-search-content__button'}
                            colors={{
                                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                icon: [COLORS.GRAY_PRIMARY, COLORS.DARK_SECONDARY],
                            }}>
                            <UiIcon size={12} name={"arrowDown"} color={COLORS.GRAY_PRIMARY}/>
                        </UiButton>
                    }
                </div>
                <UiButton
                    className={'p-home-search-content__submit'}
                    type={'submit'}>
                    <UiIcon size={24} name={'search'}/>
                </UiButton>

            </div>
        </UiForm>
    )
})
