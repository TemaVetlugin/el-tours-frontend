import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import autoAnimate from '@formkit/auto-animate'

import { COLORS } from "shared/contants";
import { useObservable } from "shared/hooks";

import { UiIcon } from "../UiIcon";

import './index.scss';

type PropsType = {
    title: string,
    description: string,
}

export const UiAccordion = observer(({ title, description }: PropsType) => {
    const store = useObservable({
        isOpened: false
    });

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current && autoAnimate(ref.current, {
            duration: 150
        })
    }, [parent])


    const className = classnames('ui-accordion', {
        'ui-accordion--opened': store.isOpened
    });

    return (
        <div className={className} ref={ref}>
            <div className="ui-accordion__header" onClick={() => store.set("isOpened", !store.isOpened)}>
                <h2 className="ui-accordion__title">{title}</h2>
                <div className="ui-accordion__icon">
                    <UiIcon size={22} name={'plus'} color={COLORS.WHITE}/>
                </div>
            </div>
            {store.isOpened && (
                <div className="ui-accordion__description">
                    {description}
                </div>
            )}
        </div>
    )
})
