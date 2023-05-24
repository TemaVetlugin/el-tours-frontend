import React, { useEffect } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import ReactSlider from "react-slider";

import { UiControlPropsType } from "shared/types";
import { useObservable } from "shared/hooks";

import './index.scss';

type PropsType = UiControlPropsType<number[] | null, {
    min: number,
    max: number,
    withFields?: boolean
}>;

export const UiRange = observer((
    {
        value = [0, 0],
        onChange = () => {
        },
        className,
        name = 'ui-range',
        style,
        min,
        max
    }: PropsType
) => {
    const store = useObservable({
        value: [min, max],
        buffer: [] as string[]
    });

    const classNames = classnames('ui-range', className);

    const handleSubmit = () => {
        if (store.value[0] === min && store.value[1] === max) {
            onChange({ name, value: null });
        } else {
            onChange({ name, value: store.value });
        }
    }

    useEffect(() => {
        if (value === null) {
            store.set("value", [min, max]);
            store.set("buffer", [min, max].map(val => `${val}`));
        } else {
            store.set("value", value);
            store.set("buffer", value.map(val => `${val}`));
        }
    }, [value]);

    const handleFieldValues = () => {
        let nextValue = store.buffer.map(val => !val ? 0 : +val);

        if (nextValue[0] < min) {
            nextValue[0] = min;
        }
        if (nextValue[1] > max) {
            nextValue[1] = max;
        }
        if (nextValue[0] > nextValue[1]) {
            nextValue[0] = nextValue[1];
        }
        store.set("value", nextValue);
        handleSubmit();
    }

    if (store.value.length !== 2) {
        return (
            <>UiRange value needs to be length = 2</>
        );
    }

    return (
        <div className={classNames} style={style}>
            <div className="ui-range__fields">
                {store.buffer.map((value, index) => (
                    <input
                        key={index}
                        value={value}
                        onChange={(e) => {
                            const nextBuffer = [...store.buffer];
                            nextBuffer[index] = e.target.value;
                            store.set("buffer", nextBuffer);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFieldValues();
                            }
                        }}
                        onBlur={() => {
                            handleFieldValues();
                        }}
                        type="text"
                        className="ui-range__field"
                    />
                ))}
            </div>
            <div className="ui-range__inner">
                <ReactSlider
                    step={1}
                    min={min}
                    max={max}
                    value={store.value || []}
                    onChange={(value) => {
                        store.set('value', value);
                        store.set('buffer', value.map(val => val.toString()));
                    }}
                    onAfterChange={(value) => {
                        store.set('value', value);
                        handleSubmit();
                    }}
                    className='ui-range__slider'
                    thumbClassName="ui-range__thumb"
                    trackClassName="ui-range__track"
                />
            </div>
        </div>
    )
});
