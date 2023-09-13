'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import {html} from "shared/utilities";
import {UiButton, UiIcon, UiTypography} from "shared/ui";
import {COLORS} from "shared/contants";
import './index.scss';
import {UserService} from "shared/services";

type PropsType = {
    content?: string,
}
export const PBlogContent = observer(({content}: PropsType) => {
    return (
        <div className="p-blog-content">
            <UiTypography>
            {html(content)}
            </UiTypography>

            <div className="p-blog-content__like">
                <span>Лайкнуть - это модно!</span>
                <div className="p-blog-content__like__count">
                    <p>Понравилось: 283</p>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                            border: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.WHITE, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'like'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
            </div>
        </div>
    )
})
