'use client';

import classnames from "classnames";
import { Observer, observer } from "mobx-react-lite";
import React from "react";
import { SwiperSlide } from "swiper/react";

import './index.scss';

type PropsType = {
    className?: string
    render: ({ isActive }: {isActive: boolean}) =>   JSX.Element
}

export const Slide = observer(({ className, render }: PropsType) => {
    return (
        <SwiperSlide className={classnames("ui-slider-slide", className)}>
            {(entry) => (
                <Observer render={() => render(entry)}/>
            )}
        </SwiperSlide>
    )
})
Slide.displayName = "SwiperSlide";
