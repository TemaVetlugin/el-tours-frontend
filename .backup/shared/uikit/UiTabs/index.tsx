import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { UiControlPropsType } from "shared/types";

import './index.scss';
import { useMedia } from "shared/hooks";
import { UiDropdown, UiIcon } from "shared/uikit";
import { COLORS } from "shared/contants";

type PropsType = UiControlPropsType<string | number | null, {
    items: {
        id: string | number | null,
        name: string | number,
        badge?: string | number | null,
    }[]
}>;

export const UiTabs = observer((
    {
        items = [],
        value,
        name = 'ui-tabs',
        onChange = () => {
        }
    }: PropsType
) => {
    const { is360 } = useMedia();

    // if (is360) {
    //     return (
    //         <UiDropdown
    //             className={"ui-tabs-mobile"}
    //             items={items}
    //             onChange={onChange}
    //             name={name}
    //             value={value}
    //             control={(item, isOpened) => {
    //                 return (
    //                     <div className="ui-tabs-mobile__control">
    //                         <span>{item?.name || 'Не выбрано'}</span>
    //                         <UiIcon size={14} name={isOpened ? 'chevronUp' : 'chevronDown'} color={COLORS.GRAY_ICON}/>
    //                     </div>
    //                 )
    //             }}
    //         />
    //     )
    // }
    return (
        <div className="ui-tabs">
            {items.map(item => {
                const classNames = classnames('ui-tabs-item', {
                    'ui-tabs-item--active': value === item.id
                });
                return (
                    <div
                        key={item.id}
                        className={classNames}
                        onClick={() => onChange({
                            name,
                            value: item.id
                        })}
                    >
                        <span>{item.name}</span>
                        {item.badge && (
                            <div className="ui-tabs-item__badge">{item.badge}</div>
                        )}
                    </div>
                )
            })}
        </div>
    )
});
