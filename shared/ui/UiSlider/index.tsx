'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import classnames from "classnames";

import { useObservable } from "shared/hooks";
import { ChangeHandlerType } from "shared/types";

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

type PropsType = {
    value?: number,
    onChange?: ChangeHandlerType<number>,
    items: any[],
    effect?: 'slide' | 'fade',
    loop?: boolean,
    perPage?: number | 'auto',
    perGroup?: number,
    gap?: number,
    renderItem: (item: any, isActive: boolean) => React.ReactNode,
    renderNavigation?: (navigation: NavigationType) => React.ReactNode;
    className?: string,
    slideClassName?: string,
    autoHeight?: boolean,
    autoPlay?: number
}

export const UiSlider = observer((
    {
        items,
        renderItem,
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
    }: PropsType
) => {
    const store = useObservable({
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
                    autoplay={autoPlay ? { delay: autoPlay } : {}}
                    autoHeight={autoHeight}
                    slidesPerView={perPage}
                    slidesPerGroup={perPage === 'auto' ? 1 : (perGroup || perPage)}
                    spaceBetween={gap}
                    onSwiper={swiper => {
                        store.set("swiper", swiper);
                    }}
                    effect={"fade"}
                    loop={loop}
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
                            {({ isActive }) => renderItem(item, isActive)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {renderNavigation && renderNavigation(navigation)}
        </div>
    )
})

