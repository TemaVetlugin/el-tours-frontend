'use client';

import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import classnames from "classnames";

import { date } from "shared/utilities";
import { UiIcon } from "shared/ui";
import { COLORS } from "shared/contants";
import { useStore, useOnClickOutside } from "shared/hooks";

import { UiControlPropsType } from "../types";

import './index.scss';

registerLocale('ru', ru)

type PropsType = UiControlPropsType<string> & {
    min?: string
};

export const UiDatepicker = observer((
    {
        name = 'ui-datepicker',
        value,
        min,
        onChange,
    }: PropsType
) => {
    const ref = useRef<HTMLDivElement>(null);
    const store = useStore({
        isOpened: false
    });
    useOnClickOutside(ref, () => {
        store.set("isOpened", false)
    })

    return (
        <div ref={ref} className={classnames('ui-datepicker', {
            'ui-datepicker--opened': store.isOpened
        })}>
            <div className="ui-datepicker__control" onClick={() => store.set("isOpened", !store.isOpened)}>
                {value && (
                    <div className="ui-datepicker__value">
                        {date(value).toFormat('dd.MM.yyyy')}
                    </div>
                )}
                <div className="ui-datepicker__icon">
                    <UiIcon size={24} name={'calendar'} color={COLORS.GRAY_PRIMARY}/>
                </div>
            </div>
            {store.isOpened && (
                <div className="ui-datepicker__outer">
                    <DatePicker
                        inline
                        dateFormat={'yyyy-MM-dd'}
                        previousMonthButtonLabel={(<UiIcon size={24} name={'chevronLeft'} color={'#000'}/>)}
                        nextMonthButtonLabel={(<UiIcon size={24} name={'chevronRight'} color={'#000'}/>)}
                        locale={'ru'}
                        selected={date(value).toJSDate() || null}
                        minDate={min ? date(min).toJSDate() : undefined}
                        onChange={(data) => {
                            if (data) {
                                onChange && onChange({
                                    name,
                                    value: date(data.toISOString()).toFormat('yyyy-MM-dd')
                                });
                            }

                            store.set("isOpened", false);
                        }}
                    />
                </div>
            )}
        </div>
    )
})

