'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {WorkerModel} from "shared/models";
import {UiButton, UiIcon, UiLink, UiPage} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import './index.scss';
import {UserService} from "shared/services";

type PropsType = {
    item: WorkerModel,
    name?: string,
    template?: 'base' | 'light'
}

export const VmWorker = observer(({item, name, template = 'base'}: PropsType) => {

    return (
        <div className="vm-worker">
            <div className="vm-worker-header__image" style={{ backgroundImage: `url(${item.photo})` }}></div>
            <div className="vm-worker-header">
                <h2 className="vm-worker-header__title">{item.name}</h2>
                <span className="vm-worker-header__subtitle">{item.job}</span>
            </div>

            <div className="vm-worker-body">
                <div className="vm-worker-body__contact">
                    <UiIcon size={20} name={"phone"} color={COLORS.GRAY_PRIMARY}/>
                    <span>{item.phone}</span>
                </div>
                <div className="vm-worker-body__contact">
                    <UiIcon size={[18, 20]} name={"email"} color={COLORS.GRAY_PRIMARY}/>
                    <span>{item.email}</span>
                </div>
                <div className="vm-worker-body__contact">
                    <UiIcon size={[18, 20]} name={"spot"} color={COLORS.GRAY_PRIMARY}/>
                    <span>{item.address}</span>
                </div>
            </div>
            <div className="vm-worker__medias">
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                        icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={18} name={'vk'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                        icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={18} name={'telegram'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                        icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={18} name={'whatsapp'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
                <UiButton
                    template={'icon'}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                        icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={18} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                </UiButton>
            </div>
        </div>
    )
})
