'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { UiButton, UiIcon, UiLink, UiSlider } from "shared/ui";
import { useStore } from "shared/hooks";
import { ArticleModel, PaginationModel } from "shared/models";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    // article: HotelModelInterface,
}


export const VmCatalogTour = observer(() => {
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
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
    const classNames = classnames('vm-catalog-tour');

    return (
        <div className={classNames}>
            <div className="vm-catalog-tour__wrap">
                <div className="vm-catalog-tour-media">
                    <UiSlider
                        className={'vm-catalog-tour-media-slider'}
                        slideClassName={'vm-catalog-tour-media-slide'}
                        lineClassName={'vm-catalog-tour-media-line'}
                        perGroup={1}
                        perPage={1}
                        gap={8}
                        items={media}
                        slide={(item, index) => (
                            <UiSlider.Slide
                                render={() => (
                                    <div
                                        className={classnames('vm-catalog-tour-media-slide__inner', {
                                            'vm-catalog-tour-media-slide__inner--active': index === store.activeSlide
                                        })}
                                    >
                                        {item.type === 'image' && (
                                            <div
                                                className={'vm-catalog-tour-media-slide__image'}
                                                onClick={() => {
                                                    store.set("activeSlide", index);
                                                    store.set("lightboxIndex", index);
                                                }}
                                                style={{
                                                    backgroundImage: `url(${item.src})`
                                                }}
                                            />
                                        )}
                                    </div>
                                )}/>
                        )}
                        renderLine={(item, _, index) => (
                            <div
                                className={classnames('vm-catalog-tour-media-line__step', {
                                    'vm-catalog-tour-media-line__step--active': index === store.activeSlide
                                })}
                                onClick={() => {
                                    store.set("activeSlide", index);
                                }}
                            >
                            </div>
                        )}
                    />
                    <div className="vm-catalog-tour__wrap--absolute">
                        <div className="vm-catalog-tour__wrap--center">
                            <div className="vm-catalog-tour-media__rating"><span>9.6</span></div>
                            <span>превосходно</span>
                            <UiIcon size={20} name={'comments'}/>
                            <span>126</span>
                        </div>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-media__button'}
                            colors={{
                                button: [COLORS.WHITE, COLORS.WHITE],
                                icon: [COLORS.ORANGE_PRIMARY, COLORS.ORANGE_PRIMARY],
                            }}
                        >
                            <UiIcon size={20} name={'lighting'}/>
                        </UiButton>
                    </div>
                </div>
                <div className="vm-catalog-tour-description">
                    <div className="vm-catalog-tour-description-header">
                        <div className="vm-catalog-tour-description-header__wrap">
                            <div className="vm-catalog-tour-description-header__stars">
                                <UiIcon size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                                <UiIcon size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                                <UiIcon size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                                <UiIcon size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                                <UiIcon size={12} name={'ratingStar'} color={COLORS.ORANGE_PRIMARY}/>
                            </div>
                            <UiButton
                                template={'normal'}
                                className={'vm-catalog-tour-description-header__button'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                                }}
                            >
                                <span>Отель+Авиа</span>
                            </UiButton>
                            <span>Забронировано 60 раз за месяц</span>
                        </div>
                        <UiIcon size={24} name={'heart'}/>
                    </div>
                    <h3 className="vm-catalog-tour-description__title">Makedonia Palace</h3>
                    <div className="vm-catalog-tour-description-info">
                        <div className="vm-catalog-tour-description-info__country">Афины, Греция</div>
                        <div className="vm-catalog-tour-description-info__link">
                            <UiIcon size={16} name={'info'}/>
                            <UiLink>Об отеле</UiLink>
                        </div>
                        <div className="vm-catalog-tour-description-info__link">
                            <UiIcon size={16} name={'geoMark'}/>
                            <UiLink>На карте</UiLink>
                        </div>
                    </div>
                    <div className="vm-catalog-tour-description-details">
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={24} name={'fork'}/>
                        </UiButton>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={[40, 24]} name={'hills'}/>
                        </UiButton>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={[16, 8]} name={'waves'}/>
                            <span>500 м</span>
                        </UiButton>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={22} name={'fork'}/>
                        </UiButton>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={28} name={'wiFi'}/>
                        </UiButton>
                        <UiButton
                            template={'icon'}
                            className={'vm-catalog-tour-description-details__item'}
                            colors={{
                                button: [COLORS.GRAY_SECONDARY, COLORS.WHITE],
                                border: [COLORS.WHITE, COLORS.DARK_SECONDARY_BORDER],
                                label: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                                icon: [COLORS.DARK_SECONDARY, COLORS.DARK_PRIMARY],
                            }}>
                            <UiIcon size={12} name={'airPlane'}/>
                            <span>14 км</span>
                        </UiButton>
                    </div>

                    <div className="vm-catalog-tour-description-footer">
                        <div>
                            <div className="vm-catalog-tour-description-footer__wrap">
                                <UiIcon size={24} name={'watches'}/>
                                <span className="vm-catalog-tour-description-footer--bald">C перелетом</span>
                                <span className="vm-catalog-tour-description-footer__price">61 234 ₽</span>
                            </div>
                            <span>C 9 августа на 7 ночей за двоих</span>
                        </div>

                        <UiButton
                            template={'large'}
                            className={'vm-catalog-tour-description-footer__button'}
                            colors={{
                                button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                label: [COLORS.WHITE, COLORS.WHITE],
                            }}
                        >
                            <span>от 29 631 ₽</span>
                            <UiButton
                                template={'icon'}
                                className={'vm-catalog-tour-description-footer__button--absolute'}
                                colors={{
                                    button: [COLORS.ORANGE_PRIMARY, COLORS.ORANGE_PRIMARY],
                                    label: [COLORS.WHITE, COLORS.WHITE],
                                }}
                            >
                                <span>?</span>
                            </UiButton>
                        </UiButton>
                    </div>
                </div>
            </div>
        </div>
    )
})
