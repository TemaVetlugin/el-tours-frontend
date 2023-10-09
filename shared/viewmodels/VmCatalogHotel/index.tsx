'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { UiButton, UiIcon, UiLink, UiSlider } from "shared/ui";
import { useStore } from "shared/hooks";
import { HotelModelInterface } from "shared/models";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    hotel: HotelModelInterface,
}


export const VmCatalogHotel = observer(({hotel}:PropsType) => {
    const store = useStore({
        isLoading: true,
        activeSlide: 0,
        isShallowLoading: true,

    });
    const media = [
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        // и т.д.
    ];
    const classNames = classnames('vm-catalog-hotel');

    return (
        <div className={classNames}>
            <div className="vm-catalog-hotel__wrap">
                <div className="vm-catalog-hotel-media">
                    <div className="vm-catalog-hotel-media__image" style={{backgroundImage: `url(${hotel.photo})`}}></div>

                    <div className="vm-catalog-tour__wrap--absolute">
                        <div className="vm-catalog-tour__wrap--center">
                            {hotel.rating&&hotel.rating!==0&&
                                <>
                            <div className="vm-catalog-tour-media__rating"><span>{hotel.rating/10}</span></div>
                            <span>превосходно</span>
                                </>}
                            <UiIcon size={20} name={'comments'}/>
                            <span>126</span>
                        </div>
                    </div>
                </div>
                <div className="vm-catalog-hotel-description">
                    <div className="vm-catalog-hotel-description-header">
                        <div className="vm-catalog-hotel-description-header__wrap">
                            <div className="vm-catalog-hotel-description-header__stars">
                                {
                                    Array(hotel.category).fill(hotel.category).map((_, i) =>
                                        <UiIcon key={i} size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                                    )
                                }
                            </div>
                            <UiButton
                                template={'normal'}
                                className={'vm-catalog-hotel-description-header__button'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                                }}
                            >
                                <span>Отель</span>
                            </UiButton>
                            <span>????????</span>
                        </div>
                        <UiIcon size={24} name={'heart'}/>
                    </div>
                    <h3 className="vm-catalog-hotel-description__title">{hotel.hotelName}</h3>
                    <div className="vm-catalog-hotel-description-info">
                        <div className="vm-catalog-hotel-description-info__country"><span>{hotel.city}</span></div>
                        <div className="vm-catalog-hotel-description-info__link">
                            <UiIcon size={16} name={'info'}/>
                            <UiLink>Об отеле</UiLink>
                        </div>
                        <div className="vm-catalog-hotel-description-info__link">
                            <UiIcon size={16} name={'geoMark'}/>
                            <UiLink>На карте</UiLink>
                        </div>
                    </div>
                    <div className="vm-catalog-hotel-description-address">
                        <UiIcon size={16} name={'card'}/>
                        <span>{hotel.address}</span>
                    </div>
                    <div className="vm-catalog-hotel-description-details">
                        {hotel.facts&&hotel.facts.map((fact)=>
                            <>
                                <UiButton
                                    template={'icon'}
                                    className={'vm-catalog-hotel-description-details__item'}
                                    colors={{
                                        button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                        border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                        label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                        icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                    }}>
                                    <div className={"vm-catalog-hotel-description-details__icon"} style={{backgroundImage:`url(${fact.iconUrl})`}}></div>
                                </UiButton>
                            </>
                        )}

                    </div>
                </div>
            </div>
            <div className="vm-catalog-hotel-footer">
                <div>
                    <div className="vm-catalog-hotel__wrap">
                        <UiIcon size={20} name={"bed"}></UiIcon>
                        <span className={"vm-catalog-hotel-footer--bald"}>Номер «{hotel.roomType}»</span>
                    </div>
                    <span>?????</span>
                </div>
                <div className="vm-catalog-hotel__wrap">
                    <div>
                        <div className="vm-catalog-hotel-footer__wrap">
                            <span className="vm-catalog-hotel-footer__price">{hotel.minPrice} ₽</span>
                            <span className="vm-catalog-hotel-footer__price--old">??????</span>
                        </div>
                        <span>с {hotel.date} на {hotel.nights} ночей за {hotel.tourists}</span>
                    </div>
                    <UiButton
                        template={'large'}
                        className={'vm-catalog-hotel-footer__button'}
                        colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            label: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <span>Смотреть все номера</span>
                    </UiButton>
                </div>
            </div>
        </div>
    )
})
