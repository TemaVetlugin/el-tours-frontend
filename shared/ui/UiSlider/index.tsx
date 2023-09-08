'use client';

import classnames from "classnames";
import {Observer, observer} from "mobx-react-lite";
import React, {ReactElement, useEffect} from "react";
import {Autoplay, EffectFade} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Swiper as SwiperInstance} from 'swiper/types';

import {useStore} from "shared/hooks";
import {OnChangeType} from "shared/types";

import 'swiper/css';
import 'swiper/css/effect-fade';

import './index.scss';

type NavigationType = {
    prev: () => void,
    next: () => void,
    current: () => number,
    pages: () => number,
    dots: (className: string) => React.ReactNode[],
    total: () => number,
    set: (slide: number) => void
}

type PropsType<T> = {
    value?: number,
    onChange?: OnChangeType<number>,
    items: T[],
    effect?: 'slide' | 'fade',
    loop?: boolean,
    perPage?: number | 'auto',
    perGroup?: number,
    gap?: number,
    renderItem: (item: T, isActive: boolean, index: number) => ReactElement,
    renderLine?: (item: T, isActive: boolean, index: number) => ReactElement,
    renderNavigation?: (navigation: NavigationType) => React.ReactNode;
    className?: string,
    slideClassName?: string,
    autoHeight?: boolean,
    autoPlay?: number
}

export const UiSlider = observer(<T, >(
    {
        items,
        renderItem,
        renderLine,
        renderNavigation,
        effect = 'slide',
        loop = false,
        perPage = 1,
        perGroup,
        gap = 0,
        slideClassName,
        className,
        autoPlay,
        autoHeight = true
    }: PropsType<T>
) => {
    const store = useStore({
        isInitialized: false,
        swiper: null as SwiperInstance | null,
        activeSlide: 0
    });

    useEffect(() => {
        store.set("isInitialized", true);
    }, []);

    if (!items || items.length === 0) {
        return null;
    }

    const navigation: NavigationType = {
        prev: () => {
            store.swiper?.slidePrev();
        },
        next: () => {
            store.swiper?.slideNext();
        },
        current: () => {
            return store.activeSlide || 0;
        },
        pages: () => {
            if (perPage === 'auto') {
                return items.length
            }
            return Math.ceil(items.length / perPage);
        },
        dots: (className = 'dot') => {
            const dots: React.ReactNode[] = [];
            const dotsCount = navigation.pages();
            for (let i = 0; i < dotsCount; i++) {
                const classNames = classnames(className, {
                    [`${className}--active`]: i === store.activeSlide,
                });
                dots.push(<div key={i} className={classNames} onClick={() => {
                    const modifier = perPage === 'auto' ? 1 : perPage;
                    if (loop) {
                        store.swiper?.slideToLoop(i * modifier)
                    } else {
                        store.swiper?.slideTo(i * modifier)
                    }
                }}/>)
            }
            return dots;
        },
        total: () => {
            return items.length;
        },
        set: (slide: number) => {
            store.swiper?.slideTo(slide);
        }
    };

    const modules = [];
    if (effect === 'fade') {
        modules.push(EffectFade);
    }

    if (autoPlay) {
        modules.push(Autoplay);
    }

    return (
        <div className={classnames('ui-slider', className, {
            'ui-slider--initialized': store.isInitialized,
            [`${className}--initialized`]: store.isInitialized,
        })}>
            <div className="ui-slider__inner">

                <Swiper
                    autoplay={autoPlay ? {delay: autoPlay} : {}}
                    autoHeight={autoHeight}
                    slidesPerView={perPage}
                    slidesPerGroup={perPage === 'auto' ? 1 : (perGroup || perPage)}
                    spaceBetween={gap}
                    onSwiper={swiper => {
                        store.set("swiper", swiper);
                    }}
                    effect={"fade"}
                    loop={true}
                    loopedSlides={1}
                    direction={"horizontal"}
                    modules={modules}
                    onSlideChange={(swiper) => {
                        if (perPage !== 'auto' && perPage > 1) {
                            store.set("activeSlide", Math.ceil(swiper.realIndex / perPage));
                        } else {
                            store.set("activeSlide", swiper.realIndex);
                        }
                    }}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className={slideClassName}>
                            {({isActive}) => <Observer render={() => renderItem(item, isActive, index)}/>}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {renderLine&&
                <div className="ui-slider__line">
                    <div className="ui-slider__line--gray">
                        {items.map((item, index) => (
                            <SwiperSlide key={index}>
                                {({isActive}) => <Observer render={() => renderLine(item, isActive, index)}/>}
                            </SwiperSlide>
                        ))}
                    </div>
                </div>
                }
            </div>
            {renderNavigation && renderNavigation(navigation)}
        </div>
    )
})

