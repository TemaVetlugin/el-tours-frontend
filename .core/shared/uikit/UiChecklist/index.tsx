import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { UiControlPropsType } from "shared/types";
import { UiCheckbox } from "shared/uikit";
import { lodash } from "shared/utilities";

import { UiScroll } from "../UiScroll";

import './index.scss';

type PropsType = UiControlPropsType<(number | string)[], {
    isFlat?: boolean,
    items?: {
        id: number | string,
        name: string
    }[],
}>;
export const UiChecklist = observer((
    {
        value,
        items = [],
        name = 'ui-checklist',
        isFlat = false,
        onChange = () => {
        }
    }: PropsType
) => {
    const classNames = classnames('ui-checklist', {
        'ui-checklist--flat': isFlat
    });

    const handleChange = (item: { id: string | number, name: string }) => (data: { name: string, value: number | null }) => {
        if (!value) {
            if (data.value === 1) {
                onChange({
                    name,
                    value: [item.id]
                })
            }
            return;
        }
        let newValue = [...value];
        if (data.value === 0) {
            newValue = newValue.filter(v => v !== item.id)
        } else {
            newValue.push(item.id)
        }

        onChange({
            name,
            value: lodash.uniq(newValue)
        })
    }

    if (!items?.length) {
        return null;
    }

    if (isFlat) {
        return (
            <div className={classNames}>
                {items.map(item => {
                    let isActive = false;
                    if (!!value) {
                        isActive = value.includes(item.id);
                    }
                    return (
                        <UiCheckbox
                            key={item.id}
                            value={+isActive}
                            label={item.name}
                            onChange={handleChange(item)}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div className={classNames}>
            <UiScroll maxHeight={300}>
                <div className="ui-checklist__inner">
                    {items.map(item => {
                        let isActive = false;
                        if (!!value) {
                            isActive = value.includes(item.id);
                        }
                        return (
                            <UiCheckbox
                                key={item.id}
                                value={+isActive}
                                label={item.name}
                                onChange={handleChange(item)}
                            />
                        )
                    })}
                </div>
            </UiScroll>
        </div>
    )
});
