import React from "react";
import { observer } from "mobx-react";

import { COLORS } from "shared/contants";

import { UiControlItemType } from "shared/types";

import { UiDropdown } from "../UiDropdown";
import { UiIcon } from "../UiIcon";

import './index.scss';

const items: UiControlItemType[] = [
    {
        id: 'vk',
        name: (<>
            <UiIcon size={20} name={"vk"} color='#5181b8'/><span>Вконтакте</span>
        </>)
    },
    {
        id: 'ok',
        name: (<>
            <UiIcon size={20} name={"odnoklassniki"} color={['#ee8208', '#fff']}/>
            <span>Одноклассники</span>
        </>)
    },
    {
        id: 'tg',
        name: (<>
            <UiIcon size={20} name={"telegram"} color={'#0088cc'}/>
            <span>Telegram</span>
        </>)
    },
    {
        id: 'wa',
        name: (<>
            <UiIcon size={20} name={"whatsapp"} color={'#25D366'}/>
            <span>Whatsapp</span>
        </>)
    }
]

type PropsType = {
    url?: string
}
export const UiSocialShare = observer(({ url }: PropsType) => {
    let shareUrl = url || '';
    if (typeof window !== 'undefined' && !url) {
        shareUrl = window.location.href;
    }
    return (
        <UiDropdown
            items={items}
            value={null}
            onChange={({ value }) => {
                switch (value) {
                    case 'vk':
                        window.open(`https://vk.com/share.php?url=${shareUrl}`);
                        break;
                    case 'wa':
                        window.open(`https://api.whatsapp.com/send?text=${shareUrl}`);
                        break;
                    case 'ok':
                        window.open(`https://connect.ok.ru/offer?url=${shareUrl}`);
                        break;
                    case 'tg':
                        window.open(`https://t.me/share/url?url=${shareUrl}`);
                        break;
                }
            }}
            control={() => (
                <div className="ui-social-share">
                    <div className="ui-social-share__text">Поделиться</div>
                    <div className="ui-social-share__icon">
                        <UiIcon size={22} name={'share'} color={COLORS.BLACK}/>
                    </div>
                </div>
            )}
        />
    )
})
