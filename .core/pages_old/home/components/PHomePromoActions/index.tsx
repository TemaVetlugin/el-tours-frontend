import { observer } from "mobx-react";
import React from "react";

import {  PromoActionModel2 } from "shared/models";
import { UiArticleTile, UiButton, UiGrid, UiIcon, UiLink, UiSlider } from "shared/uikit";
import { COLORS, MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { useMedia } from "shared/hooks";

import './index.scss';

type PropsType = {
    promoActions: PromoActionModel2[]
}

export const PHomePromoActions = observer(({ promoActions }: PropsType) => {
    const { is360 } = useMedia();

    return (
        <LayoutSection
            className={'p-home-promo'}
            title={'Акции'}
            headerAside={
                <UiLink
                    href={ROUTES.PROMO_ACTIONS()}
                    className={'underline-wave underline-wave--large'}
                >
                    <span>Смотреть все</span>
                    <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                </UiLink>
            }
        >
            {is360 && (
                <div className="p-home-promo-slider">
                    <UiSlider
                        effect='slide'
                        autoPlay={5000}
                        items={promoActions}
                        perPage={'auto'}
                        loop={true}
                        renderItem={(promoAction: PromoActionModel2) => (
                            <div
                                key={promoAction.id}
                                className='p-home-promo-slider-slide'
                            >
                                <UiArticleTile
                                    key={promoAction.id}
                                    name={promoAction.name}
                                    href={ROUTES.PROMO_ACTION(promoAction.slug)}
                                    image={promoAction.previewImageThumbnail}
                                    badge={promoAction.badge}
                                />
                            </div>
                        )}
                    />
                </div>
            )}

            {!is360 && (
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                    [MEDIA_POINTS.IS_768]: { columns: 3, gap: 16 },
                    [MEDIA_POINTS.IS_1024]: { columns: 4, gap: 16 },
                    [MEDIA_POINTS.IS_1440]: { columns: 4, gap: 20 }
                }}>
                    {promoActions.map(promoAction => (
                        <UiArticleTile
                            key={promoAction.id}
                            name={promoAction.name}
                            href={ROUTES.PROMO_ACTION(promoAction.slug)}
                            image={promoAction.previewImageThumbnail}
                            badge={promoAction.badge}
                        />
                    ))}
                </UiGrid>
            )}
        </LayoutSection>
    )
});
