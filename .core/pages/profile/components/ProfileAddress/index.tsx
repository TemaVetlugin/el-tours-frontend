import React from "react";
import { observer } from "mobx-react";

import { UiIcon } from "shared/uikit";
import { COLORS } from "shared/contants";

import "./index.scss";

type PropsType = {
    name: string,
    text: string,
}

export const ProfileAddress = observer(({ name, text }: PropsType) => {
    return (
        <div className='profile-address'>
            <div className='profile-address__name'>{name}</div>
            <div className='profile-address__text'>{text}</div>
            <div className='profile-address__actions'>
                <button type='button' className='profile-address__button'>
                    <UiIcon size={24} name={'pencil'} color={COLORS.GRAY_MEDIUM} />
                </button>
                <button type='button' className='profile-address__button profile-address__button--orange-hover'>
                    <UiIcon size={24} name={'trash'} color={COLORS.GRAY_MEDIUM} />
                </button>
            </div>
        </div>
    )
});

export default ProfileAddress;
