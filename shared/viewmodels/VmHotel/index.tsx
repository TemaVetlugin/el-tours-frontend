'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import classnames from "classnames";

import './index.scss';
import {UiLightbox, UiSlider} from "shared/ui";
import {useStore} from "shared/hooks";
import {ArticleModel, PaginationModel} from "shared/models";

type PropsType = {
    // article: HotelModelInterface,
}



export const VmHotel = observer(() => {
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
    const classNames = classnames('vm-hotel');

    return (
        <div className={classNames}>

                <div className="vm-hotel-media">
                    <UiSlider
                        className={'vm-hotel-media-slider'}
                        slideClassName={'vm-hotel-media-slide'}
                        lineClassName={'vm-hotel-media-line'}
                        perGroup={1}
                        perPage={1}
                        gap={8}
                        items={media}
                        slide={(item, index) => (
                            <UiSlider.Slide
                                render={() => (
                                    <div
                                        className={classnames('vm-hotel-media-slide__inner', {
                                            'vm-hotel-media-slide__inner--active': index === store.activeSlide
                                        })}
                                    >
                                        {item.type === 'image' && (
                                            <div
                                                className={'vm-hotel-media-slide__image'}
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
                                className={classnames('vm-hotel-media-line__step', {
                                    'vm-hotel-media-line__step--active': index === store.activeSlide
                                })}
                                onClick={() => {
                                    store.set("activeSlide", index);
                                }}
                            >
                            </div>
                        )}
                    />
                </div>
        </div>
    )
})
