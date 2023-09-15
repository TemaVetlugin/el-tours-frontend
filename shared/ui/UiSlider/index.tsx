'use client';

import classnames from "classnames";
import { Observer, observer } from "mobx-react-lite";
import React, { ReactElement, useEffect, useMemo } from "react";

import { useMedia, useStore } from "shared/hooks";
import { OnChangeType } from "shared/types";

import 'swiper/css';
import 'swiper/css/effect-fade';
import {Autoplay, EffectFade, FreeMode, Pagination as SwiperPagination, Scrollbar} from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperInstance, SwiperModule } from 'swiper/types';

import { Dots } from "./components/Dots";
import { Slide } from "./components/Slide";

import './index.scss';
import { NavigationType } from "./types/Navigation.type";

type PropsType<T> = {
    value?: number,
    onChange?: OnChangeType<number>,
    items: T[],
    effect?: 'slide' | 'fade',
    loop?: boolean,
    scrollbar?: boolean,
    freeMode?: boolean,
    perPage?: number | 'auto',
    perGroup?: number,
    gap?: number,
    slide: (item: T, index: number) => ReactElement,
    renderLine?: (item: T, isActive: boolean, index: number) =>
        ReactElement,
    navigation?: (navigation: NavigationType, index?: number) => React.ReactNode;
    className?: string,
    slideClassName?: string,
    autoHeight?: boolean,
    autoPlay?: number
}

const Slider = observer(<T, >(
    {
        items,
        slide,
        navigation,
        effect = 'slide',
        renderLine,
        loop,
        perPage = 1,
        perGroup,
        freeMode = false,
        gap = 0,
        scrollbar=false,
        slideClassName,
        className,
        autoPlay,
        autoHeight = true
    }: PropsType<T>
) => {
    const store = useStore({
        isInitialized: false,
        key: Date.now(),
        swiper: null as SwiperInstance | null,
        activeSlide: 0
    });

    useEffect(() => {
        store.set("isInitialized", true);
        store.swiper?.update();
    }, [store]);

    if (!items || items.length === 0) {
        return null;
    }

    const Navigation: NavigationType = {
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
            const dotsCount = Navigation.pages();
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

    const modules = useMemo(() => {
        const result: SwiperModule[] = [];

        if (effect === 'fade') {
            result.push(EffectFade);
        }

        if (autoPlay) {
            result.push(Autoplay);
        }

        if (freeMode) {
            result.push(FreeMode);
        }
        if (1) {
            result.push(Scrollbar);
        }
        if (1) {
            result.push(SwiperPagination);
        }

        return result;
    }, [effect, autoPlay, freeMode]);

    const media = useMedia();

    useEffect(() => {
        // fix rerender on media change
        setTimeout(() => {
            store.set("key", Date.now())
        }, 100)
    }, [media, store]);

    return (
        <div className="ui-slider-container">
            <div className={classnames('ui-slider', `ui-slider--per-view-${perPage}`, className, {
                'ui-slider--initialized': store.isInitialized,
                [`${className}--initialized`]: store.isInitialized,
            })}>
                <div className="ui-slider__inner">
                    <Swiper
                        key={store.key}
                        autoplay={autoPlay ? { delay: autoPlay } : {}}
                        autoHeight={autoHeight}
                        slidesPerView={perPage}
                        slidesPerGroup={perPage === 'auto' ? 1 : (perGroup || perPage)}
                        spaceBetween={gap}
                        onSwiper={swiper => {
                            store.set("swiper", swiper);
                        }}
                        scrollbar={{
                            draggable: true,

                        }}
                        initialSlide={0}
                        effect={"fade"}
                        freeMode={freeMode}
                        loop={loop}
                        modules={modules}
                        pagination={{ clickable: true }}
                        onSlideChange={(swiper) => {
                            if (perPage !== 'auto' && perPage > 1) {
                                store.set("activeSlide", Math.ceil(swiper.realIndex / perPage));
                            } else {
                                store.set("activeSlide", swiper.realIndex);
                            }

                        }}
                    >
                        {items.map(slide)}
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
            </div>
            {navigation && navigation(Navigation)}
        </div>
    )
})

export const UiSlider = Object.assign(Slider, { Dots, Slide });


