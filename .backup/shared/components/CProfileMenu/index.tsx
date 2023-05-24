import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { UiCard, UiIcon, UiLink, UiStickerCircle } from "shared/uikit";
import { COLORS, MEDIA_POINTS, ROUTES } from "shared/contants";
import { usersLogoutRequest } from "shared/requests/api";
import { BootstrapModule, UserModule } from "shared/modules";

import "./index.scss";
import { useMedia } from "shared/hooks";

export const CProfileMenu = observer(() => {
    const router = useRouter();

    const handleLogout = async () => {
        const { isSuccess, data } = await usersLogoutRequest();
        if (isSuccess && data) {
            UserModule.setAccessToken(data.accessToken);
            await router.push(ROUTES.HOME());
            await BootstrapModule.client();
        }
    }

    const { value: stickerProps } = useMedia({
        [MEDIA_POINTS.IS_360]: { size: 64, stickerSize: 35 },
        [MEDIA_POINTS.IS_768]: { size: 102, stickerSize: 56 },
    });

    return (
        <UiCard className="c-profile-menu" isLight>
            <div className="c-profile-menu__image">
                <UiStickerCircle
                    name={'square'}
                    size={stickerProps.size}
                    stickerSize={stickerProps.stickerSize}
                    color={COLORS.YELLOW_LIGHT}
                />
            </div>
            <div className="c-profile-menu__items">
                <UiLink href={ROUTES.PROFILE()} className={"c-profile-menu-item"}>
                    <div className="c-profile-menu-item__icon">
                        <UiIcon size={24} name={'user'} color={COLORS.GRAY_DARK}/>
                    </div>
                    <div className="c-profile-menu-item__name">Личные данные</div>
                </UiLink>
                <UiLink
                    href={ROUTES.PROFILE_ORDERS()}
                    className={"c-profile-menu-item"}
                    activeRoutes={[ROUTES.PROFILE_ORDER()]}
                >
                    <div className="c-profile-menu-item__icon">
                        <UiIcon size={24} name={'file'} color={COLORS.GRAY_DARK}/>
                    </div>
                    <div className="c-profile-menu-item__name">Мои заказы</div>
                </UiLink>
                <div onClick={handleLogout} className="c-profile-menu-item">
                    <div className="c-profile-menu-item__icon">
                        <UiIcon size={24} name={'logout'} color={COLORS.GRAY_DARK}/>
                    </div>
                    <div className="c-profile-menu-item__name">Выйти</div>
                </div>
            </div>
        </UiCard>
    )
});
