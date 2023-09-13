'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiGrid, UiIcon, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PBlogMediasAside = observer(() => {
    return (
        <div>
            <div className="p-blog-medias-aside">
                <div>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'vk'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
                <div>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'telegram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
                <div>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'whatsapp'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
                <div>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
                <div>
                    <UiButton
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GRAY_PRIMARY, COLORS.GREEN_PRIMARY],
                            icon: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={15} name={'viber'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
            </div>
        </div>
    )
})
